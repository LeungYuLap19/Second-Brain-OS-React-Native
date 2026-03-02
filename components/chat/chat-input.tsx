import { ChatInputProps } from '@/types/components';
import React from 'react';
import MessageComposer from '../ui/message-composer';

export function ChatInput({ value, onChangeText, onSend, isConnected, onHeightChange }: ChatInputProps) {
  return (
    <MessageComposer
      value={value}
      onChangeText={onChangeText}
      onSend={onSend}
      placeholder={isConnected ? 'Enter anything here...' : 'Connecting...'}
      editable={isConnected}
      onHeightChange={onHeightChange}
      sendIcon="arrow-up"
      sendIconSize={22}
      containerClassName={'pb-8'}
    />
  );
}
