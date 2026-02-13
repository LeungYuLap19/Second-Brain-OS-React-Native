import { View } from 'react-native'
import React from 'react'
import { ThemedViewProps } from '@/types'

export default function ThemedView({ 
  className = '',
  children,
  ...viewProps 
}: ThemedViewProps) {
  return (
    <View className={`flex-1 bg-zinc-950 ${className}`.trim()} {...viewProps}>
      {children}
    </View>
  )
}