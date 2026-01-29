import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HistoryModal() {
  // const [history, setHistory] = useState<>();

  return (
    <SafeAreaView className='flex-1 pt-12 px-6'>
      <Text className='text-2xl font-bold'>Chat History</Text>
    </SafeAreaView>
  )
}