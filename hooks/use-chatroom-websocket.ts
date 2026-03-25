import { getErrorMessage } from '@/lib/api/client';
import { WS_URL } from '@/lib/api/config';
import { parseWebSocketMessage } from '@/lib/api/ws-parser';
import { getClientId } from '@/lib/utils/storage';
import { Message } from '@/types/chat';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useChatroomWebSocket(chatroomId: string | undefined) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAssistantMessageId, setCurrentAssistantMessageId] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);

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

  const connectWebSocket = useCallback(async (id: string) => {
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

      ws.onerror = () => {
        console.error('WebSocket connection error');
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
    } catch (error: unknown) {
      console.error('Failed to connect WebSocket:', getErrorMessage(error));
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    socketRef.current?.close();
    socketRef.current = null;
  }, []);

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

  const resetMessages = useCallback(() => {
    setMessages([
      {
        id: '-1',
        role: 'assistant',
        content: 'Hey! Here is Mochi 😸! How can I help you today?',
        timestamp: Date.now().toString(),
      },
    ]);
  }, []);

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
  }, [chatroomId, disconnect, resetMessages, connectWebSocket]);

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
