import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { MessageList } from '@/components/chat/message-list';
import ThemedSafeAreaView from '@/components/ui/layout/themed-safe-area-view';
import { useChatroomWebSocket } from '@/hooks/use-chatroom-websocket';
import { apiFetch, getErrorMessage } from '@/lib/api/clients/base-client';
import { getNewChatroomId } from '@/lib/utils/storage';
import { Chatroom } from '@/types/chat';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function ChatroomPage() {
  const { chatroom_id } = useLocalSearchParams<{ chatroom_id: string }>();
  
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(48);

  const {
    isConnecting,
    isConnected,
    messages,
    currentAssistantMessageId,
    sendMessage,
    reconnect,
    addMessages,
  } = useChatroomWebSocket(chatroom_id);

  const retrieveChatroom = async (id: string) => {
    try {
      const chatroom = await apiFetch<Chatroom>(`/retrieve_chatroom/${id}`);
      addMessages(chatroom.messages);
    } catch (error: unknown) {
      console.error('Failed to retrieve chatroom:', getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (chatroom_id) {
      retrieveChatroom(chatroom_id);
    }
  }, [chatroom_id]);

  const handleSend = () => {
    if (sendMessage(input)) {
      setInput('');
    }
  };

  const handleNewChatroom = async () => {
    const id = await getNewChatroomId();
    router.push(`/(tabs)/chatroom/${id}`);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-zinc-950"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -80 : 0}
    >
      <ThemedSafeAreaView>
        <ChatHeader
          isConnecting={isConnecting}
          isConnected={isConnected}
          onReconnect={reconnect}
          onNewChatroom={handleNewChatroom}
        />

        <MessageList
          messages={messages}
          currentAssistantMessageId={currentAssistantMessageId}
          inputHeight={inputHeight}
        />

        <ChatInput
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          isConnected={isConnected}
          onHeightChange={setInputHeight}
        />
      </ThemedSafeAreaView>
    </KeyboardAvoidingView>
  );
}
