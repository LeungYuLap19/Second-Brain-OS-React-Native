import type { SectionLabelProps } from '@/types';
import React from 'react';
import { Text } from 'react-native';

export default function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <Text className={`text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 ml-1 ${className ?? ''}`}>
      {label}
    </Text>
  );
}
