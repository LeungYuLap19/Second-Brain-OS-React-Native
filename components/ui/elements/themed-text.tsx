import { toneClassMap } from '@/constants/ui';
import type { ThemedTextProps } from '@/types';
import React from 'react';
import { Text } from 'react-native';

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