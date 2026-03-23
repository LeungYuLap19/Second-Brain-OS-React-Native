
import { API_URL, GMAIL_BASE } from '@/lib/api/config';
import { getGoogleAccessToken, refreshGoogleToken } from '@/lib/auth/google';
import type { ApiResponse } from '@/types';

/**
 * Represents an API error with status code and server detail.
 * Always use `instanceof AppError` to narrow in catch blocks.
 *
 * @param message - Human-readable error description.
 * @param statusCode - HTTP status code returned by the server.
 * @param detail - Optional server-provided detail string.
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly detail?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Type-safe wrapper around fetch for the Gmail REST API.
 *
 * - Automatically attaches the Google access token.
 * - On a 401 response, refreshes the token once and retries.
 * - Throws on non-OK responses with the Gmail API error message.
 *
 * @typeParam T - The expected JSON response shape.
 * @param path - Gmail API path appended to the base URL (e.g. `/messages?maxResults=20`).
 * @param options - Standard `RequestInit` overrides (method, body, headers, etc.).
 * @returns The parsed JSON response typed as `T`.
 * @throws {AppError} If the user is not authenticated or the request fails after a retry.
 */
export async function gmailFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getGoogleAccessToken();

  let response: Response;
  try {
    response = await fetch(`${GMAIL_BASE}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch (error: unknown) {
    throw new AppError(
      getErrorMessage(error, 'Network request failed. Check your connection.'),
    );
  }

  // If 401, try refreshing token once
  if (response.status === 401) {
    const newToken = await refreshGoogleToken();
    if (!newToken) throw new AppError('Session expired. Please sign in again.', 401);

    let retry: Response;
    try {
      retry = await fetch(`${GMAIL_BASE}${path}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${newToken}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
    } catch (error: unknown) {
      throw new AppError(
        getErrorMessage(error, 'Network request failed. Check your connection.'),
      );
    }

    if (!retry.ok) {
      const err = await retry.json().catch(() => ({}));
      throw new AppError(
        err.error?.message ?? `Gmail API error (${retry.status})`,
        retry.status,
        err.error?.message,
      );
    }
    return retry.json();
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new AppError(
      err.error?.message ?? `Gmail API error (${response.status})`,
      response.status,
      err.error?.message,
    );
  }

  return response.json();
}

/**
 * Type-safe wrapper around fetch for the backend API.
 *
 * - Throws {@link AppError} for non-OK responses or if `body.success` is false.
 * - Handles non-JSON responses (e.g. HTML 502 from a gateway).
 * - Returns the typed `data` field on success.
 *
 * @example
 * ```ts
 * const chatrooms = await apiFetch<ChatHistory[]>(`/chat_history/${clientId}`);
 * ```
 *
 * @typeParam T - The expected shape of the `data` field in the response.
 * @param path - API path appended to `API_URL` (e.g. `/chat_history/abc123`).
 * @param options - Standard `RequestInit` overrides (method, body, headers, etc.).
 * @returns The parsed `data` field typed as `T`.
 * @throws {AppError} On network failure, non-JSON responses, or unsuccessful requests.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch (error: unknown) {
    // Network failure (offline, DNS, timeout)
    throw new AppError(
      getErrorMessage(error, 'Network request failed. Check your connection.'),
    );
  }

  // Try to parse JSON — server might return HTML on 502/503
  let body: ApiResponse<T>;
  try {
    body = await response.json();
  } catch {
    throw new AppError(
      `Server returned invalid response (${response.status})`,
      response.status,
    );
  }

  if (!response.ok || !body.success) {
    throw new AppError(
      body.detail || `Request failed (${response.status})`,
      response.status,
      body.detail,
    );
  }

  return body.data;
}

/**
 * Safely extract a message from an unknown caught value.
 * Use this in every `catch` block instead of `error: any`.
 *
 * @example
 * ```ts
 * catch (error: unknown) {
 *   console.error(getErrorMessage(error));
 * }
 * ```
 *
 * @param error - The caught value (may be `Error`, `string`, or anything).
 * @param fallback - Message returned when `error` is not an `Error` or `string`.
 * @returns A human-readable error message.
 */
export function getErrorMessage(error: unknown, fallback = 'An unexpected error occurred'): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return fallback;
}
