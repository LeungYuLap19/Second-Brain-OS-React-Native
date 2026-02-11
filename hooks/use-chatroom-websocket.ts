import { WS_URL } from '@/lib/utils/server-uri';
import { getClientId } from '@/lib/utils/utilities';
import { Message, WebSocketMessage } from '@/types/chat';
import { useEffect, useRef, useState } from 'react';

const RESPONSE_START_TAG = '<RESPONSE_START>';
const END_OF_STREAM_TAG = '<END_OF_STREAM>';

export function useChatroomWebSocket(chatroomId: string | undefined) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAssistantMessageId, setCurrentAssistantMessageId] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);

  const parseWebSocketMessage = (rawData: any): WebSocketMessage | null => {
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
  };

  const handleMessageStart = () => {
    // Remove previous placeholder if exists
    if (currentAssistantMessageIdRef.current) {
      const oldId = currentAssistantMessageIdRef.current;
      setMessages(prev => prev.filter(msg => msg.id !== oldId));
    }

    // Create new assistant message
    const newMessageId = Date.now().toString();
    currentAssistantMessageIdRef.current = newMessageId;
    setCurrentAssistantMessageId(newMessageId);

    setMessages(prev => [
      ...prev,
      {
        id: newMessageId,
        role: 'assistant',
        content: '',
        timestamp: Date.now().toString(),
      },
    ]);
  };

  const handleMessageContent = (content: string) => {
    const messageId = currentAssistantMessageIdRef.current;
    if (!messageId || !content.trim()) return;

    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, content: msg.content + content } : msg
      )
    );
  };

  const handleMessageEnd = () => {
    setCurrentAssistantMessageId(null);
    currentAssistantMessageIdRef.current = null;
  };

  const connectWebSocket = async (id: string) => {
    setIsConnecting(true);
    
    try {
      const clientId = await getClientId();
      const ws = new WebSocket(`${WS_URL}/${clientId}/${id}`);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnecting(false);
        setSocket(ws);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setSocket(null);
        setIsConnecting(false);
        setCurrentAssistantMessageId(null);
        currentAssistantMessageIdRef.current = null;
      };

      ws.onerror = (error) => {
        // console.error('WebSocket error:', error);
        setIsConnecting(false);
      };

      ws.onmessage = (event) => {
        const parsed = parseWebSocketMessage(event.data);
        if (!parsed) return;

        const { data, hasStart, hasEnd } = parsed;

        if (hasStart) {
          handleMessageStart();
        }

        if (data) {
          handleMessageContent(data);
        }

        if (hasEnd) {
          handleMessageEnd();
        }
      };
    } catch (error) {
      // console.error('Failed to connect WebSocket:', error);
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    socketRef.current?.close();
    socketRef.current = null;
  };

  const reconnect = () => {
    if (chatroomId) {
      disconnect();
      connectWebSocket(chatroomId);
    }
  };

  const sendMessage = (content: string): boolean => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !content.trim()) {
      return false;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now().toString(),
    };

    setMessages(prev => [...prev, userMessage]);
    socket.send(content.trim());

    // Create placeholder for assistant response
    const placeholderId = (Date.now() + 1).toString();
    currentAssistantMessageIdRef.current = placeholderId;
    setCurrentAssistantMessageId(placeholderId);

    setMessages(prev => [
      ...prev,
      {
        id: placeholderId,
        role: 'assistant',
        content: '',
        timestamp: Date.now().toString(),
      },
    ]);

    return true;
  };

  const resetMessages = () => {
    setMessages([
      {
        id: '-1',
        role: 'assistant',
        content: 'Hey! Here is Mochi 😸! How can I help you today?',
        timestamp: Date.now().toString(),
      },
    ]);
  };

  const addMessages = (newMessages: Message[]) => {
    setMessages(prev => [...prev, ...newMessages]);
  };

  // Connect on mount or chatroomId change
  useEffect(() => {
    if (!chatroomId) return;

    disconnect();
    resetMessages();
    connectWebSocket(chatroomId);

    return () => {
      disconnect();
    };
  }, [chatroomId]);

  const isConnected = socket?.readyState === WebSocket.OPEN;

  return {
    socket,
    isConnecting,
    isConnected,
    messages,
    currentAssistantMessageId,
    sendMessage,
    reconnect,
    resetMessages,
    addMessages,
  };
}
