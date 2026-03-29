import { Dispatch, SetStateAction } from "react";

// --- types for email samples

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

// --- gmail api interfaces 

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

export interface NormalizedEmail {
  id: string;
  threadId: string;
  labelIds: GmailLabelId[];
  snippet: string;
  internalDate?: Date;
  headers: NormalizedHeader;
  plainTextBody?: string;
  htmlBody?: string;
  attachments: NormalizedAttachment[];
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

export type GmailSystemLabel =
  | 'INBOX'
  | 'SPAM'
  | 'TRASH'
  | 'UNREAD'
  | 'STARRED'
  | 'IMPORTANT'
  | 'SENT'
  | 'DRAFT'
  | 'CHAT'
  | 'CATEGORY_PERSONAL'
  | 'CATEGORY_SOCIAL'
  | 'CATEGORY_PROMOTIONS'
  | 'CATEGORY_UPDATES'
  | 'CATEGORY_FORUMS';

export type GmailLabelId = GmailSystemLabel | (string & {});
export type setEmails = Dispatch<SetStateAction<NormalizedEmail[]>>;
export type setNextPageToken = Dispatch<SetStateAction<string | undefined>>