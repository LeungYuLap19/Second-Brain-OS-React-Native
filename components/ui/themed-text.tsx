import type { ThemedTextProps } from '@/types';
import React from 'react';
import { Text } from 'react-native';

const toneClassMap: Record<NonNullable<ThemedTextProps['tone']>, string> = {
  primary: 'text-zinc-100',
  secondary: 'text-zinc-300',
  muted: 'text-zinc-400',
  subtle: 'text-zinc-500',
  inverse: 'text-zinc-900',
};

export default function ThemedText({
  tone = 'primary',
  className = '',
  children,
  ...textProps
}: ThemedTextProps) {
  return (
    <Text className={`${toneClassMap[tone]} ${className}`} {...textProps}>
      {children}
    </Text>
  );
}