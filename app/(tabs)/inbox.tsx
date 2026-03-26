import EmailListItem from '@/components/inbox/email-list-item';
import CircleButton from '@/components/ui/elements/circle-button';
import ThemedTextInput from '@/components/ui/elements/themed-text-input';
import TabScreen from '@/components/ui/layout/tab-screen';
import { emailThreads } from '@/constants/emails';
import { useEmails } from '@/context/email-context';
import { EmailListItemData } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function Inbox() {
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { emails, fetchInbox, loading } = useEmails();

  useFocusEffect(
    useCallback(() => {
      fetchInbox();
    }, [fetchInbox])
  );

  useEffect(() => {
    setIsRefreshing(loading);
  }, [loading]);

  useEffect(() => {
    console.log(JSON.stringify(emails, null, 2))
  }, [emails]);

  return (
    <TabScreen
      title="Inbox"
      subtitle={`${emailThreads.length} conversations`}
      isRefreshing={isRefreshing}
      onRefresh={fetchInbox}
      rightSlot={
        <View className="flex-row items-center gap-2">
          <CircleButton onPress={() => {}}>
            <Feather name="file-text" size={16} color="#e4e4e7" />
          </CircleButton>
          <Link href={'/mail-modal'} asChild>
            <CircleButton>
              <Feather name="edit-3" size={16} color="#e4e4e7" />
            </CircleButton>
          </Link>
        </View>
      }
    >
      <View className="flex-row items-center gap-2 rounded-xl bg-zinc-800/60 px-3 py-2 mb-4">
        <Feather name="search" size={16} color="#71717a" />
        <ThemedTextInput
          className="flex-1 text-sm py-1"
          placeholder="Search emails..."
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm text-zinc-400">Priority</Text>
      </View>

      {emailThreads.map((email) => (
        <EmailListItem
          key={email.id}
          email={email as EmailListItemData}
        />
      ))}
    </TabScreen>
  );
}