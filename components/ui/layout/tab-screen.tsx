import type { TabScreenProps } from '@/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Header from './header';
import ThemedSafeAreaView from './themed-safe-area-view';

export default function TabScreen({
  title,
  subtitle,
  rightSlot,
  scrollable = true,
  contentPaddingBottom = 80,
  children,
}: TabScreenProps) {
  return (
    <ThemedSafeAreaView edges={['top', 'left', 'right']} className='pb-10'>
      <Header title={title} subtitle={subtitle} rightSlot={rightSlot} />
      {scrollable ? (
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: contentPaddingBottom }}
        >
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1 px-6">{children}</View>
      )}
    </ThemedSafeAreaView>
  );
}
