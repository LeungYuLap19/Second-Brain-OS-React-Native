import IconCircle from '@/components/ui/elements/icon-circle';
import { getMarkdownStyles } from '@/lib/utils/utilities';
import { MessageItemProps } from '@/types/components';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

function MessageItem({ message, isStreaming }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <View className={`mb-6 flex ${isUser ? 'items-end' : 'items-start'}`}>
      <View
        className={`flex-row items-start gap-3 max-w-[85%] ${
          isUser ? 'flex-row-reverse self-end' : 'self-start'
        }`}
      >
        {/* Avatar */}
        <IconCircle
          size="sm"
          bgClassName={isUser ? 'bg-zinc-800/70' : 'bg-zinc-900/70'}
          className="flex-shrink-0"
        >
          <Text className="text-xs text-zinc-100">
            {isUser ? '👨🏻‍💻' : '😸'}
          </Text>
        </IconCircle>

        {/* Message Bubble */}
        <View
          className={`p-4 py-2 rounded-3xl relative ${
            isUser ? 'bg-zinc-800/70 border border-zinc-700' : 'bg-zinc-900/70 border border-zinc-800'
          } ${isStreaming ? 'animate-pulse' : ''}`}
        >
          {isStreaming && message.content === '' ? (
            <View className="flex-row items-center gap-1">
              <ActivityIndicator size="small" color="#a1a1aa" />
              <Text className="text-zinc-400">Thinking...</Text>
            </View>
          ) : (
            <Markdown style={getMarkdownStyles(true)}>
              {message.content}
            </Markdown>
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(MessageItem);