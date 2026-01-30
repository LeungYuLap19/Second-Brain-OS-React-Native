import { View, Text, Modal, ScrollView, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Message } from './(tabs)/chatroom';
import { convertToChatHistories } from '@/lib/utils/utilities';
import { sampleChatrooms } from '@/constants/samples';

export interface ChatHistory {
  id: string,
  topic: string,
  lastMessage: string,
  updatedAt: Date
}

export interface Chatroom { 
  id: string,
  topic: string,
  messages: Message[],
  startedAt: Date,
  updatedAt: Date,
}

export default function HistoryModal() {
  const [histories, setHistories] = useState<ChatHistory[]>([]);

  useEffect(() => {
    setHistories(convertToChatHistories(sampleChatrooms));
  }, []);

  const clearAll = () => {
    Alert.alert('Clear all conversations', 'Are you sure to erase all chat history?');
  }

  return (
    <View className='flex-1 pt-12 px-6 gap-8'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-2xl font-bold'>Chat History</Text>
        <View className='flex-row items-center gap-2'>
          <Pressable 
            onPress={clearAll}
            className='rounded-full p-3 active:bg-zinc-200'
          >
            <AntDesign name="clear" size={20} color="black" />
          </Pressable>
          
          <Pressable className='rounded-full p-3 active:bg-zinc-200'>
            <AntDesign name="plus-circle" size={20} color="black" />
          </Pressable>
        </View>
      </View>
      
      <ScrollView 
        className='flex-1'
        contentContainerStyle={{'paddingBottom': 40}}
        showsVerticalScrollIndicator={false}
      >
        {
          histories.map((history) => (
            <View 
              key={history.id}
              className='p-4 w-full rounded-3xl bg-zinc-200 flex-col mb-4'
            >
              <View className='flex-row justify-between items-center pr-2'>
                <Text className='text-lg font-medium w-4/5 line-clamp-1'>{history.topic}</Text>

                <Pressable>
                  <Entypo name="dots-three-horizontal" size={16} color="#52525b" />
                </Pressable>
              </View>
              
              <Text className='text-lg text-zinc-600 mb-4 line-clamp-2'>{history.lastMessage}</Text>
              <View className='flex-row gap-2'>
                <AntDesign name="field-time" size={16} color="#52525b" />
                <Text className='text-sm text-zinc-600'>{history.updatedAt.toDateString()}</Text>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}