import { View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

export default function Placeholder() {
  return (
    <View className="items-center py-10">
      <View className="w-12 h-12 rounded-full bg-zinc-800 items-center justify-center mb-3">
        <Feather name="check" size={20} color="#a1a1aa" />
      </View>
      <Text className="text-sm text-zinc-400">No activities scheduled</Text>
    </View>
  )
}