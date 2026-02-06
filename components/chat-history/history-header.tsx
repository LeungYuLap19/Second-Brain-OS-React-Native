import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { HistoryHeaderProps } from '@/types'

export default function HistoryHeader({ clearAll, handleNewChatroom }: HistoryHeaderProps) {
  return (
    <View className='flex-row justify-between items-center'>
      <Text className='text-2xl font-bold text-zinc-100'>Chat History</Text>
      <View className='flex-row items-center gap-2'>
        <Pressable 
          onPress={clearAll}
          className='rounded-full p-3 bg-zinc-900 border border-zinc-800 active:bg-zinc-800'
        >
          <AntDesign name="clear" size={18} color="#e5e7eb" />
        </Pressable>
        
        <Pressable 
          onPress={handleNewChatroom}
          className='rounded-full p-3 bg-zinc-900 border border-zinc-800 active:bg-zinc-800'
        >
          <Feather name="plus" size={18} color="#e4e4e7" />
        </Pressable>
      </View>
    </View>
  )
}