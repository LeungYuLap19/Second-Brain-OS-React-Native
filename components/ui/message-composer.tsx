import type { MessageComposerProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React, { useRef } from 'react';
import { TextInput, View } from 'react-native';
import CircleButton from './circle-button';

export default function MessageComposer({
  value,
  onChangeText,
  onSend,
  placeholder,
  editable = true,
  onHeightChange,
  containerClassName,
  inputClassName,
  sendIcon = 'arrow-up',
  sendIconSize = 22,
}: MessageComposerProps) {
  const inputRef = useRef<TextInput>(null);
  const canSend = value.trim().length > 0 && editable;

  return (
    <View className={`flex-row items-end gap-2 pt-4 px-6 ${containerClassName ?? ''}`}>
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor="#71717a"
        className={`flex-1 border bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl min-h-12 max-h-24 p-4 ${
          !editable ? 'opacity-50' : ''
        } ${inputClassName ?? ''}`}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="default"
        multiline
        editable={editable}
        onSubmitEditing={onSend}
        onLayout={(event) => onHeightChange?.(event.nativeEvent.layout.height)}
      />

      <CircleButton onPress={onSend} disabled={!canSend}>
        <Feather name={sendIcon} size={sendIconSize} color={canSend ? '#f4f4f5' : '#52525b'} />
      </CircleButton>
    </View>
  );
}