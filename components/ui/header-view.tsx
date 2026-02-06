import { HeaderViewProps } from '@/types'
import React from 'react'
import { View } from 'react-native'

export default function HeaderView({ className = '', children }: HeaderViewProps) {
  return (
    <View className={`flex-row items-center px-6 pb-4 pt-2 ${className}`}>
      {children}
    </View>
  )
}