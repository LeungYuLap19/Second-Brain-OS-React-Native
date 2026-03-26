import { buildRawMessage, normalizedGmailMessage } from '@/lib/utils/gmail-helpers';
import type {
  GmailDraft,
  GmailDraftListResponse,
  GmailDraftParams,
  GmailListResponse,
  GmailMessage,
  GmailReplyParams,
  GmailSendParams,
  NormalizedEmail,
} from '@/types';
import { fetchAndNormalizeMessages, gmailFetch } from './clients/gmail-client';

export const gmailApi = {
  /**
   * Fetch emails from the main inbox.
   * @returns List of normalized emails and pagination token.
   */
  fetchInbox: async (
    maxResults = 20,
    pageToken?: string,
  ): Promise<{ messages: NormalizedEmail[]; nextPageToken?: string }> => {
    const params = new URLSearchParams({
      maxResults: String(maxResults),
      labelIds: 'INBOX',
    });
    if (pageToken) params.set('pageToken', pageToken);

    const list = await gmailFetch<GmailListResponse>(`/messages?${params}`);
    const messages = await fetchAndNormalizeMessages(list);

    return { messages, nextPageToken: list.nextPageToken };
  },

  /**
   * Search emails using Gmail search syntax.
   * @param query - Search syntax (e.g., "is:unread").
   */
  searchEmails: async (
    query: string,
    maxResults = 20,
    pageToken?: string,
  ): Promise<{ messages: NormalizedEmail[]; nextPageToken?: string }> => {
    const params = new URLSearchParams({
      q: query,
      maxResults: String(maxResults),
    });
    if (pageToken) params.set('pageToken', pageToken);

    const list = await gmailFetch<GmailListResponse>(`/messages?${params}`);
    const messages = await fetchAndNormalizeMessages(list);

    return { messages, nextPageToken: list.nextPageToken };
  },

  /**
   * Get a single message by ID and normalize it.
   */
  getMessage: async (messageId: string): Promise<NormalizedEmail> => {
    const msg = await gmailFetch<GmailMessage>(`/messages/${messageId}?format=full`);
    return normalizedGmailMessage(msg);
  },

  /**
   * Send a new email.
   */
  sendEmail: async (params: GmailSendParams): Promise<NormalizedEmail> => {
    const raw = buildRawMessage(params);
    const sentMsg = await gmailFetch<GmailMessage>('/messages/send', {
      method: 'POST',
      body: JSON.stringify({ raw }),
    });
    return normalizedGmailMessage(sentMsg);
  },

  /**
   * Reply to an existing email thread.
   */
  replyToEmail: async (params: GmailReplyParams): Promise<NormalizedEmail> => {
    const raw = buildRawMessage({
      to: params.to,
      subject: params.subject,
      body: params.body,
      cc: params.cc,
      bcc: params.bcc,
      inReplyTo: params.inReplyTo,
      references: params.references,
    });

    const sentMsg = await gmailFetch<GmailMessage>('/messages/send', {
      method: 'POST',
      body: JSON.stringify({ raw, threadId: params.threadId }),
    });
    return normalizedGmailMessage(sentMsg);
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
};
