import { HistoryHeaderProps } from '@/types'
import { AntDesign, Feather } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import CircleButton from '../ui/circle-button'
import Header from '../ui/header'

export default function HistoryHeader({ clearAll, handleNewChatroom }: HistoryHeaderProps) {
  return (
    <Header
      title='Chat History'
      variant='modal'
      rightSlot={
        <View className='flex-row items-center gap-2'>
          <CircleButton onPress={clearAll}>
            <AntDesign name="clear" size={18} color="#e4e4e7" />
          </CircleButton>
          
          <CircleButton onPress={handleNewChatroom}>
            <Feather name="plus" size={18} color="#e4e4e7" />
          </CircleButton>
        </View>
      }
    />
  )
}