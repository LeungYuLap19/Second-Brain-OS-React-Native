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
  emails: NormalizedEmail[];
  nextPageToken?: string;
  loading: boolean;
  fetchInbox: (pageToken?: string) => Promise<void>;
  searchEmails: (query: string, pageToken?: string) => Promise<void>;
  sendEmail: (params: GmailSendParams) => Promise<NormalizedEmail | undefined>;
  replyToEmail: (params: GmailReplyParams) => Promise<NormalizedEmail | undefined>;
  createDraft: (params: GmailDraftParams) => Promise<GmailDraft | undefined>;
}

export interface NormalizedEmail {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  internalDate: string;
  headers: NormalizedHeader;
  plainTextBody?: string;
  htmlBody?: string;
  attachments: NormalizedAttachment[];
  // Other fields if you need them, e.g., raw email content
  // raw?: string;
}

export interface NormalizedHeader {
  from?: ParsedEmailAddress;
  to?: ParsedEmailAddress[]; // Array to handle multiple recipients
  cc?: ParsedEmailAddress[]; // Array to handle multiple CC recipients
  bcc?: ParsedEmailAddress[]; // Array to handle multiple BCC recipients
  subject?: string;
  date?: Date; // Convert to Date object
  replyTo?: ParsedEmailAddress;
  messageId?: string; // Standard Message-ID header
  inReplyTo?: string; // Standard In-Reply-To header
  references?: string[]; // Standard References header
  [key: string]: string | string[] | Date | ParsedEmailAddress | ParsedEmailAddress[] | undefined; // Allow for other headers if needed
}

export interface NormalizedAttachment {
  filename: string;
  mimeType: string;
  size: number;
  attachmentId: string; // Needed for downloading later
  // If you want to embed small attachments, you could add:
  // data?: string; // Base64url encoded content
}

export interface ParsedEmailAddress { 
  name: string; 
  email: string 
}

export type setEmails = Dispatch<SetStateAction<NormalizedEmail[]>>;
export type setNextPageToken = Dispatch<SetStateAction<string | undefined>>