import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';

interface ReplyBoxProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export default function ReplyBox({ value, onChangeText, onSend }: ReplyBoxProps) {
  const canSend = value.trim().length > 0;

  return (
    <View className="px-6 pb-6 pt-3 border-t border-zinc-900 bg-zinc-950">
      <View className="flex-row items-end gap-2">
        <TextInput
          placeholder="Write a reply..."
          placeholderTextColor="#71717a"
          className="flex-1 border bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl min-h-12 max-h-28 p-4"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="default"
          multiline
        />
        <Pressable
          onPress={onSend}
          disabled={!canSend}
          className="rounded-full p-3 bg-zinc-900 border border-zinc-800 active:bg-zinc-800"
        >
          <Feather name="send" size={18} color={canSend ? '#f4f4f5' : '#52525b'} />
        </Pressable>
      </View>
    </View>
  );
}
