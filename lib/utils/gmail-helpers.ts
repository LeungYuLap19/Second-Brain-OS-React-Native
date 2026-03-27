import type { GmailMessage, NormalizedEmail, NormalizedHeader, ParsedEmailAddress } from '@/types';

/**
 * Builds a URL-safe base64-encoded RFC 2822 email message for the Gmail API.
 *
 * @param params - The email fields (to, subject, body, and optional cc/bcc/threading headers).
 * @returns A URL-safe base64 string suitable for the Gmail `raw` field.
 */
export function buildRawMessage(params: {
  to: string[];
  subject: string;
  body: string;
  cc?: string[];
  bcc?: string[];
  inReplyTo?: string;
  references?: string;
}): string {
  const lines: string[] = [
    `To: ${params.to.join(', ')}`,
    `Subject: ${params.subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
  ];

  if (params.cc?.length) lines.push(`Cc: ${params.cc.join(', ')}`);
  if (params.bcc?.length) lines.push(`Bcc: ${params.bcc.join(', ')}`);
  if (params.inReplyTo) lines.push(`In-Reply-To: ${params.inReplyTo}`);
  if (params.references) lines.push(`References: ${params.references}`);

  lines.push('', params.body);

  // Gmail expects URL-safe base64
  const raw = btoa(unescape(encodeURIComponent(lines.join('\r\n'))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return raw;
}

/* ── Message parsing helpers ── */

/**
 * Extracts a header value from a Gmail message by name (case-insensitive).
 *
 * @param message - The full Gmail message object.
 * @param name - The header name to look up (e.g. `"From"`, `"Subject"`).
 * @returns The header value, or an empty string if not found.
 */
export function getHeader(message: GmailMessage, name: string): string {
  return message.payload.headers.find(
    (h) => h.name.toLowerCase() === name.toLowerCase(),
  )?.value ?? '';
}

/**
 * Recursively searches a MIME payload tree for a part matching the given MIME type.
 *
 * @param payload - A MIME payload node (may contain nested `parts`).
 * @param mimeType - The MIME type to match (e.g. `"text/plain"`).
 * @returns The decoded content of the first matching part, or `null` if none is found.
 */
export function findPart(
  payload: { mimeType: string; body?: { data?: string }; parts?: typeof payload[] },
  mimeType: string,
): string | null {
  if (payload.mimeType === mimeType && payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      const result = findPart(part, mimeType);
      if (result) return result;
    }
  }
  return null;
}

/**
 * Decodes a URL-safe base64 string (as returned by the Gmail API) to UTF-8 text.
 *
 * @param data - The URL-safe base64-encoded string.
 * @returns The decoded UTF-8 string.
 */
export function decodeBase64Url(data: string): string {
  const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(escape(atob(base64)));
}

/**
 * Parses an RFC 2822 email address header into a name and email pair.
 *
 * @example
 * ```ts
 * parseEmailAddress('"John Doe" <john@example.com>');
 * // { name: 'John Doe', email: 'john@example.com' }
 * ```
 *
 * @param header - The raw address string (e.g. `"Name <email>"` or just `"email"`).
 * @returns An object with `name` and `email` fields.
 */
export function parseEmailAddress(header: string): ParsedEmailAddress {
  const match = header.match(/^(.+?)\s*<(.+)>$/);
  if (match) return { name: match[1].replace(/^"|"$/g, ''), email: match[2] };
  return { name: header, email: header };
}

/**
 * Parses relevant email headers from a Gmail message payload into a normalized format.
 *
 * @param message - The full Gmail message object.
 * @returns An object containing normalized header information.
 */
export function parseEmailHeader(message: GmailMessage): NormalizedHeader {
  const headers: NormalizedHeader = {
    from: undefined,
    to: undefined,
    cc: undefined,
    bcc: undefined,
    subject: undefined,
    date: undefined,
    replyTo: undefined,
    messageId: undefined,
    inReplyTo: undefined,
    references: undefined
  };

  const payload = message.payload; // Access payload directly from message

  // The 'if (payload)' check is technically redundant here as payload is always present
  // in a valid GmailMessage, but it doesn't cause harm.
  if (payload) {
    const fromHeader = getHeader(message, 'From');
    if (fromHeader) headers.from = parseEmailAddress(fromHeader);

    const toHeader = getHeader(message, 'To');
    if (toHeader) {
      // Split by comma and map each part to a parsed email address
      headers.to = toHeader.split(',').map(s => parseEmailAddress(s.trim()));
    }

    const ccHeader = getHeader(message, 'Cc');
    if (ccHeader) {
      headers.cc = ccHeader.split(',').map(s => parseEmailAddress(s.trim()));
    }

    const bccHeader = getHeader(message, 'Bcc');
    if (bccHeader) {
      headers.bcc = bccHeader.split(',').map(s => parseEmailAddress(s.trim()));
    }

    const subjectHeader = getHeader(message, 'Subject');
    if (subjectHeader) headers.subject = subjectHeader;

    const dateHeader = getHeader(message, 'Date');
    // Convert date string to Date object
    if (dateHeader) headers.date = new Date(dateHeader);

    const replyToHeader = getHeader(message, 'Reply-To');
    if (replyToHeader) headers.replyTo = parseEmailAddress(replyToHeader);

    const messageIdHeader = getHeader(message, 'Message-ID');
    if (messageIdHeader) headers.messageId = messageIdHeader;

    const inReplyToHeader = getHeader(message, 'In-Reply-To');
    if (inReplyToHeader) headers.inReplyTo = inReplyToHeader;

    const referencesHeader = getHeader(message, 'References');
    // Split references by whitespace and filter out any empty strings
    if (referencesHeader) {
      headers.references = referencesHeader.split(/\s+/).filter(Boolean);
    }
  }

  return headers;
}

/**
 * Normalizes a raw GmailMessage object into a simplified and flattened NormalizedEmail interface.
 * This function extracts headers, body content (plain text and HTML), and attachment metadata.
 *
 * @param message - The raw GmailMessage object fetched from the Gmail API.
 * @returns A NormalizedEmail object, easier to consume by UI components.
 */
export function normalizedGmailMessage(message: GmailMessage): NormalizedEmail {
  const normalized: NormalizedEmail = {
    id: message.id,
    threadId: message.threadId,
    labelIds: message.labelIds,
    snippet: message.snippet,
    internalDate: message.internalDate,
    headers: {},
    plainTextBody: undefined,
    htmlBody: undefined,
    attachments: [],
  };

  const payload = message.payload;

  normalized.headers = parseEmailHeader(message);

  // --- Parse Body ---
  // Use findPart directly for both plain text and HTML to populate both fields
  normalized.plainTextBody = findPart(payload, 'text/plain') || undefined;
  normalized.htmlBody = findPart(payload, 'text/html') || undefined;

  // TODO: --- Extract Attachments ---

  return normalized;
}