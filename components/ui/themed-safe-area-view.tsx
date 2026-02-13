import type { ThemedSafeAreaViewProps } from '@/types';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ThemedSafeAreaView({
  className = '',
  children,
  ...safeAreaViewProps
}: ThemedSafeAreaViewProps) {
  return (
    <SafeAreaView className={`flex-1 bg-zinc-950 ${className}`.trim()} {...safeAreaViewProps}>
      {children}
    </SafeAreaView>
  );
}
