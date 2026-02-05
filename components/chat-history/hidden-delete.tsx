import { HiddenDeleteProps } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function HiddenDelete({ rowMap, item, handleDeleteChatroom }: HiddenDeleteProps) {
  return (
    <View className='flex-1 h-full flex-row justify-end items-center mb-4 pr-4 bg-zinc-950'>
      <Pressable
        onPress={() => {
        rowMap[item.id]?.closeRow?.();
        handleDeleteChatroom(item.id);
        }}
        className='bg-red-500 h-full w-20 rounded-3xl items-center justify-center'
      >
        <AntDesign name="delete" size={18} color="white" />
        <Text className='text-white text-xs mt-1'>Delete</Text>
      </Pressable>
    </View>
  )
}