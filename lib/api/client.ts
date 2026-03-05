import { API_URL } from '@/lib/api/config';

/**
 * Represents an API error with status code and server detail.
 * Always use `instanceof AppError` to narrow in catch blocks.
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

interface ApiResponse<T> {
  success: boolean;
  data: T;
  detail?: string;
}

/**
 * Type-safe wrapper around fetch for your API.
 *
 * - Throws `AppError` for non-OK responses or if `body.success` is false.
 * - Handles non-JSON responses (e.g. HTML 502 from a gateway).
 * - Returns the typed `data` field on success.
 *
 * Usage:
 *   const chatrooms = await apiFetch<ChatHistory[]>(`/chat_history/${clientId}`);
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
 * Usage:
 *   catch (error: unknown) {
 *     console.error(getErrorMessage(error));
 *   }
 */
export function getErrorMessage(error: unknown, fallback = 'An unexpected error occurred'): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return fallback;
}
