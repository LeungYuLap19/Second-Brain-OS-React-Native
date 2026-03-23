import type { GmailMessage } from '@/types';

/* ── RFC 2822 message builder ── */

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
 * Extracts the plain-text (or HTML fallback) body from a Gmail message.
 *
 * @param message - The full Gmail message object.
 * @returns The decoded body string, or an empty string if no body is found.
 */
export function getBody(message: GmailMessage): string {
  const body = findPart(message.payload, 'text/plain')
    ?? findPart(message.payload, 'text/html')
    ?? '';
  return body;
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
export function parseEmailAddress(header: string): { name: string; email: string } {
  const match = header.match(/^(.+?)\s*<(.+)>$/);
  if (match) return { name: match[1].replace(/^"|"$/g, ''), email: match[2] };
  return { name: header, email: header };
}
