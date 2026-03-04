import type { ThemedTextInputProps } from '@/types';
import React from 'react';
import { TextInput } from 'react-native';

export default function ThemedTextInput({ className, ...rest }: ThemedTextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#52525b"
      className={`text-base font-medium text-zinc-200 ${className ?? ''}`}
      {...rest}
    />
  );
}
