import { getMarkdownStyles } from '@/lib/utils/utilities';
import { MessageItemProps } from '@/types/components';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

export function MessageItem({ message, isStreaming }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <View className={`mb-6 flex ${isUser ? 'items-end' : 'items-start'}`}>
      <View
        className={`flex-row items-start gap-3 max-w-[85%] ${
          isUser ? 'flex-row-reverse self-end' : 'self-start'
        }`}
      >
        {/* Avatar */}
        <View
          className={`w-8 h-8 rounded-full items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-zinc-100' : 'bg-zinc-800'
          }`}
        >
          <Text className={`text-xs ${isUser ? 'text-zinc-700' : 'text-white'}`}>
            {isUser ? '🤡' : '😸'}
          </Text>
        </View>

        {/* Message Bubble */}
        <View
          className={`p-4 py-2 rounded-3xl relative ${
            isUser ? 'bg-zinc-800' : 'bg-zinc-100'
          } ${isStreaming ? 'border border-zinc-300 py-4' : ''}`}
        >
          {isStreaming && message.content === '' ? (
            <View className="flex-row items-center gap-1">
              <ActivityIndicator size="small" color="#a1a1aa" />
              <Text className="text-zinc-400">Thinking...</Text>
            </View>
          ) : (
            <Markdown style={getMarkdownStyles(isUser)}>
              {message.content}
            </Markdown>
          )}
        </View>
      </View>
    </View>
  );
}
