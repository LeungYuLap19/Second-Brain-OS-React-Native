import type { MessageComposerProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import { GlassView } from 'expo-glass-effect';
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
      <GlassView
        glassEffectStyle="regular"
        style={{
          flex: 1,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'rgba(113, 113, 122, 0.3)',
          opacity: !editable ? 0.5 : 1,
        }}
      >
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor="#71717a"
          className={`text-zinc-100 min-h-12 max-h-24 p-4 ${inputClassName ?? ''}`}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="default"
          multiline
          editable={editable}
          onSubmitEditing={onSend}
          onLayout={(event) => onHeightChange?.(event.nativeEvent.layout.height)}
        />
      </GlassView>

      <GlassView
        glassEffectStyle="regular"
        style={{
          borderRadius: 9999,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'rgba(113, 113, 122, 0.3)',
        }}
      >
        <CircleButton onPress={onSend} disabled={!canSend} className="bg-transparent border-0">
          <Feather name={sendIcon} size={sendIconSize} color={canSend ? '#f4f4f5' : '#52525b'} />
        </CircleButton>
      </GlassView>
    </View>
  );
}