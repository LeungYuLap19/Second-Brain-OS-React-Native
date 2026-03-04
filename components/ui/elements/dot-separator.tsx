import type { DotSeparatorProps } from '@/types';
import React from 'react';
import { View } from 'react-native';

export default function DotSeparator({ size = 'md' }: DotSeparatorProps) {
  const cls = size === 'sm' ? 'w-0.5 h-0.5 bg-zinc-700' : 'w-1 h-1 bg-zinc-600';
  return <View className={`${cls} rounded-full`} />;
}
