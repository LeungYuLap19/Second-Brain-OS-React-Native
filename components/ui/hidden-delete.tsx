import type { HiddenDeleteProps } from '@/types';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

export default function HiddenDelete<T extends { id: string }>({
  rowMap,
  item,
  onDelete,
  containerClassName = 'flex-1 h-full flex-row justify-end items-center mb-3 pr-4',
  buttonClassName = 'bg-red-500/10 active:bg-red-500/20 w-16 h-[72px] rounded-2xl items-center justify-center border border-red-500/20',
}: HiddenDeleteProps<T>) {
  return (
    <View className={containerClassName}>
      <Pressable
        onPress={() => {
          rowMap[item.id]?.closeRow?.();
          onDelete(item.id);
        }}
        className={buttonClassName}
      >
        <Feather name="trash-2" size={18} color="#f87171" />
      </Pressable>
    </View>
  );
}
