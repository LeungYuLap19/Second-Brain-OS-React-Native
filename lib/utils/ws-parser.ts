import type { WebSocketMessage } from '@/types/chat';

const RESPONSE_START_TAG = '<RESPONSE_START>';
const END_OF_STREAM_TAG = '<END_OF_STREAM>';

/**
 * Parses raw WebSocket data into a structured message.
 * Detects start/end stream tags and strips them from the content.
 */
export function parseWebSocketMessage(rawData: unknown): WebSocketMessage | null {
  let data: string;

  try {
    data = typeof rawData === 'string' ? rawData : String(rawData);
  } catch {
    return null;
  }

  const hasStart = data.includes(RESPONSE_START_TAG);
  const hasEnd = data.includes(END_OF_STREAM_TAG);
  const cleanData = data
    .replace(new RegExp(RESPONSE_START_TAG, 'g'), '')
    .replace(new RegExp(END_OF_STREAM_TAG, 'g'), '');

  return { data: cleanData, hasStart, hasEnd };
}
