import type { HiddenDeleteProps } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function HiddenDelete<T extends { id: string }>({
  rowMap,
  item,
  onDelete,
  containerClassName = 'flex-1 h-full flex-row justify-end items-center mb-4 pr-4',
  buttonClassName = 'bg-red-500 h-full w-20 rounded-3xl items-center justify-center',
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
        <AntDesign name="delete" size={18} color="white" />
        <Text className='text-white text-xs mt-1'>Delete</Text>
      </Pressable>
    </View>
  );
}
