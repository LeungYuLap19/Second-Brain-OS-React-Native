import { setChatroomId } from '@/lib/utils/utilities';
import { HistoryItemProps } from '@/types';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function HistoryItem({ currentId, item }: HistoryItemProps) {
  const isSelected = currentId === item.id;
  
  return (
    <Pressable
      onPress={async () => {
        await setChatroomId(item.id);
        router.replace(`/(tabs)/chatroom/${item.id}`);
      }}
      className={`p-4 rounded-2xl border mb-3 flex-row gap-4 ${
        isSelected 
          ? 'bg-zinc-900 border-zinc-700' 
          : 'bg-zinc-950 border-zinc-800'
      }`}
    >
      <View className={`w-10 h-10 rounded-full items-center justify-center border ${
        isSelected
          ? 'bg-zinc-800 border-zinc-600'
          : 'bg-zinc-800 border-zinc-700'
      }`}>
        <Feather 
          name="message-square" 
          size={18} 
          color={isSelected ? '#f4f4f5' : '#a1a1aa'} 
        />
      </View>

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between items-start">
          <Text className={`text-base font-semibold line-clamp-1 flex-1 mr-2 ${
            isSelected ? 'text-zinc-100' : 'text-zinc-200'
          }`}>
            {item.first_message || "New Chat"}
          </Text>
          <Text className="text-[10px] text-zinc-500 font-medium mt-1">
            {item.updated_at}
          </Text>
        </View>

        <Text className="text-sm text-zinc-500 line-clamp-2 leading-5">
          {item.last_message || "No messages yet"}
        </Text>
      </View>
    </Pressable>
  )
}