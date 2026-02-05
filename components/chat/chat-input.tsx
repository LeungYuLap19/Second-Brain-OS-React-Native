import { ChatInputProps } from '@/types/components';
import Feather from '@expo/vector-icons/Feather';
import React, { useRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';

export function ChatInput({ value, onChangeText, onSend, isConnected, onHeightChange }: ChatInputProps) {
  const inputRef = useRef<TextInput>(null);
  const canSend = value.trim() && isConnected;

  return (
    <View className="flex-row items-end gap-2 pt-4 px-6">
      <TextInput
        ref={inputRef}
        placeholder={isConnected ? 'Enter anything here...' : 'Connecting...'}
        className={`flex-1 border bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl min-h-12 max-h-24 p-4 ${
          !isConnected ? 'opacity-50' : ''
        }`}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="default"
        multiline
        editable={isConnected}
        onSubmitEditing={onSend}
        onLayout={(event) => onHeightChange(event.nativeEvent.layout.height)}
      />
      
      <Pressable
        onPress={onSend}
        disabled={!canSend}
        className="rounded-full p-3 bg-zinc-900 border border-zinc-800 active:bg-zinc-800"
      >
        <Feather
          name="arrow-up"
          size={24}
          color={canSend ? '#f4f4f5' : '#52525b'}
        />
      </Pressable>
    </View>
  );
}
