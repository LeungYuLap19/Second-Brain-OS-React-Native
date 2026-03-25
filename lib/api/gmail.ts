import { AppError, getErrorMessage } from '@/lib/api/client';
import { buildRawMessage } from '@/lib/utils/gmail-helpers';
import type {
    GmailDraft,
    GmailDraftListResponse,
    GmailDraftParams,
    GmailListResponse,
    GmailMessage,
    GmailReplyParams,
    GmailSendParams,
} from '@/types';
import { getGoogleAccessToken, refreshGoogleToken } from '../auth/google';
import { GMAIL_BASE } from './config';

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
async function gmailFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
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

export const gmailApi = {
  /**
   * Fetch emails from the main inbox.
   */
  fetchInbox: async (
    maxResults = 20,
    pageToken?: string,
  ): Promise<{ messages: GmailMessage[]; nextPageToken?: string }> => {
    const params = new URLSearchParams({
      maxResults: String(maxResults),
      labelIds: 'INBOX',
    });
    if (pageToken) params.set('pageToken', pageToken);

    const list = await gmailFetch<GmailListResponse>(`/messages?${params}`);

    if (!list.messages?.length) return { messages: [] };

    const messages = await Promise.all(
      list.messages.map((msg) =>
        gmailFetch<GmailMessage>(`/messages/${msg.id}?format=full`),
      ),
    );

    return { messages, nextPageToken: list.nextPageToken };
  },

  /**
   * Search emails using Gmail search syntax.
   * Examples: "from:user@example.com", "subject:invoice", "is:unread"
   */
  searchEmails: async (
    query: string,
    maxResults = 20,
    pageToken?: string,
  ): Promise<{ messages: GmailMessage[]; nextPageToken?: string }> => {
    const params = new URLSearchParams({
      q: query,
      maxResults: String(maxResults),
    });
    if (pageToken) params.set('pageToken', pageToken);

    const list = await gmailFetch<GmailListResponse>(`/messages?${params}`);

    if (!list.messages?.length) return { messages: [] };

    const messages = await Promise.all(
      list.messages.map((msg) =>
        gmailFetch<GmailMessage>(`/messages/${msg.id}?format=full`),
      ),
    );

    return { messages, nextPageToken: list.nextPageToken };
  },

  /**
   * Send a new email.
   */
  sendEmail: async (params: GmailSendParams): Promise<GmailMessage> => {
    const raw = buildRawMessage(params);

    return gmailFetch<GmailMessage>('/messages/send', {
      method: 'POST',
      body: JSON.stringify({ raw }),
    });
  },

  /**
   * Reply to an existing email thread.
   */
  replyToEmail: async (params: GmailReplyParams): Promise<GmailMessage> => {
    const raw = buildRawMessage({
      to: params.to,
      subject: params.subject,
      body: params.body,
      cc: params.cc,
      bcc: params.bcc,
      inReplyTo: params.inReplyTo,
      references: params.references,
    });

    return gmailFetch<GmailMessage>('/messages/send', {
      method: 'POST',
      body: JSON.stringify({ raw, threadId: params.threadId }),
    });
  },

  /**
   * Create a draft email.
   */
  createDraft: async (params: GmailDraftParams): Promise<GmailDraft> => {
    const raw = buildRawMessage(params);

    return gmailFetch<GmailDraft>('/drafts', {
      method: 'POST',
      body: JSON.stringify({
        message: {
          raw,
          ...(params.threadId ? { threadId: params.threadId } : {}),
        },
      }),
    });
  },

  /**
   * List drafts.
   */
  listDrafts: async (
    maxResults = 20,
    pageToken?: string,
  ): Promise<GmailDraftListResponse> => {
    const params = new URLSearchParams({ maxResults: String(maxResults) });
    if (pageToken) params.set('pageToken', pageToken);

    return gmailFetch<GmailDraftListResponse>(`/drafts?${params}`);
  },

  /**
   * Get a single message by ID.
   */
  getMessage: async (messageId: string): Promise<GmailMessage> => {
    return gmailFetch<GmailMessage>(`/messages/${messageId}?format=full`);
  },
};
