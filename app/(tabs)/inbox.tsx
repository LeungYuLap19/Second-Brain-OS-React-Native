// import EmailDetail from '@/components/inbox/email-detail';
import EmailListItem from '@/components/inbox/email-list-item';
import CircleButton from '@/components/ui/circle-button';
import Header from '@/components/ui/header';
import ThemedSafeAreaView from '@/components/ui/themed-safe-area-view';
import { emailThreads } from '@/constants/emails';
import { EmailListItemData } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Inbox() {
  const [selectedId, setSelectedId] = useState(emailThreads[0]?.id ?? '');
  const [replyText, setReplyText] = useState('');

  const selectedEmail = useMemo(
    () => emailThreads.find((email) => email.id === selectedId) ?? emailThreads[0],
    [selectedId]
  );

  const handleSend = () => {
    setReplyText('');
  };

  const listCount = emailThreads.length;

  return (
    <ThemedSafeAreaView>
      <Header
        title="Inbox"
        subtitle={`${listCount} conversations`}
        rightSlot={
          <Link href={'/mail-modal'} asChild>
            <CircleButton>
              <Feather name="edit-3" size={16} color="#e4e4e7" />
            </CircleButton>
          </Link>
        }
      />

      <View className="flex-1">
        <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
          <View className="mb-4">
            <Text className="text-sm text-zinc-400">Priority</Text>
          </View>

          {emailThreads.map((email) => (
            <EmailListItem
              key={email.id}
              email={email as EmailListItemData}
              isSelected={email.id === selectedId}
              onPress={setSelectedId}
            />
          ))}
        </ScrollView>
      </View>
    </ThemedSafeAreaView>
  );
}