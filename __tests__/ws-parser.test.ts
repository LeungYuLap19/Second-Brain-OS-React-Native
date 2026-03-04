import { parseWebSocketMessage } from '@/lib/utils/ws-parser';

describe('parseWebSocketMessage', () => {
  // ── Stream start tag ───────────────────────────────────────────

  it('detects RESPONSE_START and strips it from data', () => {
    const result = parseWebSocketMessage('<RESPONSE_START>Hello');
    expect(result).toEqual({
      data: 'Hello',
      hasStart: true,
      hasEnd: false,
    });
  });

  // ── Stream end tag ─────────────────────────────────────────────

  it('detects END_OF_STREAM and strips it from data', () => {
    const result = parseWebSocketMessage('world<END_OF_STREAM>');
    expect(result).toEqual({
      data: 'world',
      hasStart: false,
      hasEnd: true,
    });
  });

  // ── Both tags ──────────────────────────────────────────────────

  it('detects both tags in a single message', () => {
    const result = parseWebSocketMessage('<RESPONSE_START>Hi<END_OF_STREAM>');
    expect(result).toEqual({
      data: 'Hi',
      hasStart: true,
      hasEnd: true,
    });
  });

  // ── Plain text (no tags) ───────────────────────────────────────

  it('parses plain text with no tags', () => {
    const result = parseWebSocketMessage('just some text');
    expect(result).toEqual({
      data: 'just some text',
      hasStart: false,
      hasEnd: false,
    });
  });

  // ── Empty string ───────────────────────────────────────────────

  it('handles empty string', () => {
    const result = parseWebSocketMessage('');
    expect(result).toEqual({
      data: '',
      hasStart: false,
      hasEnd: false,
    });
  });

  // ── Tags only (no content) ────────────────────────────────────

  it('returns empty data when message is only tags', () => {
    const result = parseWebSocketMessage('<RESPONSE_START><END_OF_STREAM>');
    expect(result).toEqual({
      data: '',
      hasStart: true,
      hasEnd: true,
    });
  });

  // ── Non-string input (coercion) ───────────────────────────────

  it('coerces a number to string', () => {
    const result = parseWebSocketMessage(42);
    expect(result).toEqual({
      data: '42',
      hasStart: false,
      hasEnd: false,
    });
  });

  it('coerces null to string', () => {
    const result = parseWebSocketMessage(null);
    expect(result).toEqual({
      data: 'null',
      hasStart: false,
      hasEnd: false,
    });
  });

  // ── Multiple tags (duplicates) ────────────────────────────────

  it('strips all occurrences of repeated tags', () => {
    const result = parseWebSocketMessage(
      '<RESPONSE_START>A<RESPONSE_START>B<END_OF_STREAM>'
    );
    expect(result).toEqual({
      data: 'AB',
      hasStart: true,
      hasEnd: true,
    });
  });
});
