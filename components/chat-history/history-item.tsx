import { setChatroomId } from '@/lib/utils/utilities';
import { HistoryItemProps } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function HistoryItem({ currentId, item }: HistoryItemProps) {
  return (
    <Pressable
      onPress={async () => {
        await setChatroomId(item.id);
        router.replace(`/(tabs)/chatroom/${item.id}`);
      }}
      className={`p-4 w-full rounded-3xl flex-col mb-4 bg-zinc-950 ${currentId == item.id && 'bg-zinc-900'}`}
      >
      <View className='flex-row justify-between items-center pr-2'>
        <Text className='text-lg font-medium w-4/5 line-clamp-1 text-zinc-100'>{item.first_message}</Text>
      </View>
      
      <Text className='text-lg text-zinc-400 mb-4 line-clamp-2'>{item.last_message}</Text>
      <View className='flex-row gap-2'>
        <AntDesign name="field-time" size={16} color="#a1a1aa" />
        <Text className='text-sm text-zinc-400'>{item.updated_at}</Text>
      </View>
    </Pressable>
  )
}