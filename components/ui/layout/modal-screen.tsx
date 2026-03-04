import type { ModalScreenProps } from '@/types';
import React from 'react';
import { View } from 'react-native';
import Header from './header';
import ThemedView from './themed-view';

export default function ModalScreen({ title, rightSlot, children, contentClassName }: ModalScreenProps) {
  return (
    <ThemedView>
      <Header title={title} variant="modal" rightSlot={rightSlot} />
      <View className={`flex-1 px-6 pb-6 ${contentClassName ?? ''}`}>
        {children}
      </View>
    </ThemedView>
  );
}
