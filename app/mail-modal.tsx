import React from 'react'
import ThemedView from '@/components/ui/themed-view'
import Header from '@/components/ui/header'
import CircleButton from '@/components/ui/circle-button'
import { Feather } from '@expo/vector-icons'

export default function MailModal() {
  return (
    <ThemedView>
      <Header 
        title='New Email'
        variant='modal'
        rightSlot={
          <CircleButton>
            <Feather name="send" size={18} color="#e4e4e7" />
          </CircleButton>
        }
      />
    </ThemedView>
  )
}