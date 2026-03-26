import { GmailListResponse, GmailMessage, NormalizedEmail } from "@/types";
import { getGoogleAccessToken, refreshGoogleToken } from "../../auth/google";
import { normalizedGmailMessage } from "../../utils/gmail-helpers";
import { GMAIL_BASE } from "../config";
import { AppError, getErrorMessage } from "./base-client";

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
 * Helper to fetch full message details and normalize them for a list of message summaries.
 * * @param list - The initial list response containing message IDs.
 * @returns An array of normalized email objects.
 */
export async function fetchAndNormalizeMessages(list: GmailListResponse): Promise<NormalizedEmail[]> {
  if (!list.messages?.length) return [];

  const detailPromises = list.messages.map((msg) =>
    gmailFetch<GmailMessage>(`/messages/${msg.id}?format=full`)
  );

  const messages = await Promise.all(detailPromises);
  return messages.map(normalizedGmailMessage);
}