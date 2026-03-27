import EmailListItem from '@/components/inbox/email-list-item';
import CircleButton from '@/components/ui/elements/circle-button';
import ThemedTextInput from '@/components/ui/elements/themed-text-input';
import CardContainer from '@/components/ui/layout/card-container';
import TabScreen from '@/components/ui/layout/tab-screen';
import { useEmails } from '@/context/email-context';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Inbox() {
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { emails, fetchInbox, loading } = useEmails();

  useEffect(() => {
    fetchInbox();
  }, []);

  useEffect(() => {
    setIsRefreshing(loading);
  }, [loading]);

  return (
    <TabScreen
      title="Inbox"
      subtitle={`${emails.reduce((acc, email) => 
        email.labelIds.includes('UNREAD') ? acc + 1 : acc, 0
      )} unread emails`}
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
      <CardContainer className='flex-row items-center gap-2 px-3 py-4 mb-4'>
        <Feather name="search" size={16} color="#71717a" />
          <ThemedTextInput
            className="flex-1 text-sm"
            placeholder="Search emails..."
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            autoCorrect={false}
          />
      </CardContainer>

      {emails.map((email) => (
        <EmailListItem
          key={email.id}
          email={email}
        />
      ))}
    </TabScreen>
  );
}