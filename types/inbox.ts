import { Dispatch, SetStateAction } from "react";

export interface EmailListItemData {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  tags?: string[];
}

export interface EmailDetailData extends EmailListItemData {
  body: string;
  to: string[];
  cc?: string[];
}

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  internalDate: string;
  payload: GmailMessagePayload;
}

export interface GmailMessagePayload {
  mimeType: string;
  headers: GmailHeader[];
  body?: GmailBody;
  parts?: GmailMessagePart[];
}

export interface GmailMessagePart {
  mimeType: string;
  headers: GmailHeader[];
  body?: GmailBody;
  parts?: GmailMessagePart[];
}

export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailBody {
  size: number;
  data?: string;
}

export interface GmailListResponse {
  messages: { id: string; threadId: string }[];
  nextPageToken?: string;
  resultSizeEstimate: number;
}

export interface GmailDraft {
  id: string;
  message: GmailMessage;
}

export interface GmailDraftListResponse {
  drafts: { id: string; message: { id: string; threadId: string } }[];
  nextPageToken?: string;
  resultSizeEstimate: number;
}

export interface GmailSendParams {
  to: string[];
  subject: string;
  body: string;
  cc?: string[];
  bcc?: string[];
}

export interface GmailReplyParams extends GmailSendParams {
  threadId: string;
  messageId: string;
  inReplyTo: string;
  references: string;
}

export interface GmailDraftParams {
  to: string[];
  subject: string;
  body: string;
  cc?: string[];
  bcc?: string[];
  threadId?: string;
}

export interface EmailContextValue {
  emails: GmailMessage[];
  nextPageToken?: string;
  loading: boolean;
  fetchInbox: (pageToken?: string) => Promise<void>;
  searchEmails: (query: string, pageToken?: string) => Promise<void>;
  sendEmail: (params: GmailSendParams) => Promise<GmailMessage | undefined>;
  replyToEmail: (params: GmailReplyParams) => Promise<GmailMessage | undefined>;
  createDraft: (params: GmailDraftParams) => Promise<GmailDraft | undefined>;
}

export type setEmails = Dispatch<SetStateAction<GmailMessage[]>>;
export type setNextPageToken = Dispatch<SetStateAction<string | undefined>>