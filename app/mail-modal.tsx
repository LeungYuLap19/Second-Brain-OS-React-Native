import EmailDetail from '@/components/inbox/email-detail'
import NewEmailFields from '@/components/inbox/new-email-fields'
import ReplyBox from '@/components/inbox/reply-box'
import CircleButton from '@/components/ui/circle-button'
import Header from '@/components/ui/header'
import ThemedView from '@/components/ui/themed-view'
import { emailThreads } from '@/constants/emails'
import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'

export default function MailModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const selectedEmail = id ? emailThreads.find((email) => email.id === id) : undefined;
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => { setReplyText('') };

  return (
    <ThemedView>
      <Header 
        title={selectedEmail ? selectedEmail.subject : 'New Email'}
        variant='modal'
        rightSlot={
          !selectedEmail ?
          <CircleButton>
            <Feather name="send" size={18} color="#e4e4e7" />
          </CircleButton> :
          undefined
        }
      />

      {selectedEmail ?
        <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
          <EmailDetail email={selectedEmail} />
        </ScrollView> :
        <View className="flex-1 px-6 pb-6">
          <NewEmailFields />
        </View>
      }

      {selectedEmail && (
        <ReplyBox value={replyText} onChangeText={setReplyText} onSend={handleSendReply} />
      )}
    </ThemedView>
  )
}