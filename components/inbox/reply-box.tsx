import type { ReplyBoxProps } from '@/types';
import React from 'react';
import MessageComposer from '../ui/message-composer';

export default function ReplyBox({ value, onChangeText, onSend }: ReplyBoxProps) {
  return (
    <MessageComposer
      value={value}
      onChangeText={onChangeText}
      onSend={onSend}
      placeholder="Write a reply..."
      sendIcon="send"
      sendIconSize={22}
      containerClassName="border-t border-zinc-900 bg-zinc-950 pb-6"
      inputClassName='max-h-80'
    />
  );
}
