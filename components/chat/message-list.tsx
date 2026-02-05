import { MessageListProps } from '@/types/components';
import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { MessageItem } from './message-item';

export function MessageList({ messages, currentAssistantMessageId, inputHeight }: MessageListProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  return (
    <ScrollView
      ref={scrollViewRef}
      className="flex-grow w-full px-6 bg-zinc-950"
      onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      style={{ marginBottom: -inputHeight * 4 }}
      contentContainerStyle={{ paddingBottom: inputHeight * 4 }}
    >
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isStreaming={message.role === 'assistant' && message.id === currentAssistantMessageId}
        />
      ))}
    </ScrollView>
  );
}
