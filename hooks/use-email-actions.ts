import { getErrorMessage } from '@/lib/api/clients/base-client';
import { gmailApi } from '@/lib/api/gmail';
import type {
  GmailDraftParams,
  GmailReplyParams,
  GmailSendParams,
  setEmails,
  setNextPageToken,
} from '@/types';
import { useCallback, useState } from 'react';

export function useEmailActions(
  setEmails: setEmails,
  setNextPageToken: setNextPageToken,
) {
  const [loading, setLoading] = useState(false);

  const fetchInbox = useCallback(async (pageToken?: string) => {
    setLoading(true);
    try {
      const { messages, nextPageToken } = await gmailApi.fetchInbox(20, pageToken);
      setEmails((prev) => (pageToken ? [...prev, ...messages] : messages));
      setNextPageToken(nextPageToken);
    } catch (error: unknown) {
      console.error('Failed to fetch inbox:', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [setEmails, setNextPageToken]);

  const searchEmails = useCallback(async (query: string, pageToken?: string) => {
    setLoading(true);
    try {
      const { messages, nextPageToken } = await gmailApi.searchEmails(query, 20, pageToken);
      setEmails((prev) => (pageToken ? [...prev, ...messages] : messages));
      setNextPageToken(nextPageToken);
    } catch (error: unknown) {
      console.error('Failed to search emails:', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [setEmails, setNextPageToken]);

  const sendEmail = useCallback(async (params: GmailSendParams) => {
    setLoading(true);
    try {
      const sent = await gmailApi.sendEmail(params);
      return sent;
    } catch (error: unknown) {
      console.error('Failed to send email:', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const replyToEmail = useCallback(async (params: GmailReplyParams) => {
    setLoading(true);
    try {
      const reply = await gmailApi.replyToEmail(params);
      return reply;
    } catch (error: unknown) {
      console.error('Failed to reply to email:', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const createDraft = useCallback(async (params: GmailDraftParams) => {
    setLoading(true);
    try {
      const draft = await gmailApi.createDraft(params);
      return draft;
    } catch (error: unknown) {
      console.error('Failed to create draft:', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    fetchInbox,
    searchEmails,
    sendEmail,
    replyToEmail,
    createDraft,
  };
}