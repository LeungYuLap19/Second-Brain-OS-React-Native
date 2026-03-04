import { Message } from '@/types/chat';
import { MessageListProps } from '@/types/components';
import React, { useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import MessageItem from './message-item';

export function MessageList({ messages, currentAssistantMessageId, inputHeight }: MessageListProps) {
  const flatListRef = useRef<FlatList<Message>>(null);

  const renderItem = useCallback(({ item }: { item: Message }) => (
    <MessageItem
      message={item}
      isStreaming={item.role === 'assistant' && item.id === currentAssistantMessageId}
    />
  ), [currentAssistantMessageId]);

  const keyExtractor = useCallback((item: Message) => item.id, []);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      className="flex-grow w-full px-6 bg-zinc-950"
      style={{ marginBottom: -inputHeight * 4 }}
      contentContainerStyle={{ paddingBottom: inputHeight * 4 }}
      onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
    />
  );
}
