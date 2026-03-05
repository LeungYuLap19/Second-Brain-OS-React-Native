import EmailDetail from '@/components/inbox/email-detail'
import NewEmailFields from '@/components/inbox/new-email-fields'
import ReplyBox from '@/components/inbox/reply-box'
import CircleButton from '@/components/ui/elements/circle-button'
import ModalScreen from '@/components/ui/layout/modal-screen'
import { emailThreads } from '@/constants/emails'
import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'

export default function MailModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const selectedEmail = id ? emailThreads.find((email) => email.id === id) : undefined;
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => { setReplyText('') };

  return (
    <ModalScreen
      title={selectedEmail ? selectedEmail.subject : 'New Email'}
      contentClassName={selectedEmail ? 'px-0 pb-0' : ''}
      rightSlot={
        !selectedEmail ?
        <CircleButton>
          <Feather name="send" size={18} color="#e4e4e7" />
        </CircleButton> :
        undefined
      }
    >
      {selectedEmail ?
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
          <EmailDetail email={selectedEmail} />
        </ScrollView> :
        <NewEmailFields />
      }

      {selectedEmail && (
        <ReplyBox value={replyText} onChangeText={setReplyText} onSend={handleSendReply} />
      )}
    </ModalScreen>
  )
}