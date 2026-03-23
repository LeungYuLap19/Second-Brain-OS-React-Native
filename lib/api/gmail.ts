import { gmailFetch } from '@/lib/api/client';
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
