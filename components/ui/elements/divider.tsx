import type { DividerProps } from '@/types';
import React from 'react';
import { View } from 'react-native';

export default function Divider({ className }: DividerProps) {
  return <View className={`h-px bg-zinc-800/50 w-full ${className ?? ''}`} />;
}
