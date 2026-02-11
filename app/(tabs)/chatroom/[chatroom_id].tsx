import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { MessageList } from '@/components/chat/message-list';
import { useChatroomWebSocket } from '@/hooks/use-chatroom-websocket';
import { API_URL } from '@/lib/utils/server-uri';
import { getNewChatroomId } from '@/lib/utils/utilities';
import { Chatroom } from '@/types/chat';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      const response = await fetch(`${API_URL}/retrieve_chatroom/${id}`, { method: 'GET' });
      const body = await response.json();
      
      if (response.ok && body.success) {
        const chatroom: Chatroom = body.data;
        addMessages(chatroom.messages);
      }
    } catch (error) {
      // console.error('Error retrieving chatroom:', error);
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
      className="h-screen-safe-offset-6 bg-zinc-950"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}
    >
      <SafeAreaView className="flex-1 bg-zinc-950">
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
