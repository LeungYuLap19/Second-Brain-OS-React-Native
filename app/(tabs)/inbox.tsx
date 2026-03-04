import EmailListItem from '@/components/inbox/email-list-item';
import CircleButton from '@/components/ui/elements/circle-button';
import TabScreen from '@/components/ui/layout/tab-screen';
import { emailThreads } from '@/constants/emails';
import { EmailListItemData } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function Inbox() {
  const [selectedId, setSelectedId] = useState(emailThreads[0]?.id ?? '');

  const listCount = emailThreads.length;

  return (
    <TabScreen
      title="Inbox"
      subtitle={`${listCount} conversations`}
      contentPaddingBottom={24}
      rightSlot={
        <Link href={'/mail-modal'} asChild>
          <CircleButton>
            <Feather name="edit-3" size={16} color="#e4e4e7" />
          </CircleButton>
        </Link>
      }
    >
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
    </TabScreen>
  );
}