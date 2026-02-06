import EmailDetail, { EmailDetailData } from '@/components/inbox/email-detail';
import EmailListItem, { EmailListItemData } from '@/components/inbox/email-list-item';
import HeaderView from '@/components/ui/header-view';
import Feather from '@expo/vector-icons/Feather';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const emailThreads: EmailDetailData[] = [
  {
    id: 'e1',
    senderName: 'Jamie Park',
    senderEmail: 'jamie@productlab.co',
    subject: 'Sprint 09 kickoff notes and open questions',
    preview: 'Sharing the kickoff notes from this morning and two open questions on scope.',
    time: '9:12 AM',
    unread: true,
    tags: ['Work', 'Product'],
    to: ['you@secondbrain.ai'],
    cc: ['leah@productlab.co'],
    body:
      'Hey team,\n\nGreat kickoff today. Attached are the highlights and the open questions we need to answer by end of week:\n\n1) Do we ship the new inbox filters in this sprint?\n2) Can we move the AI triage experiment to next week?\n\nLet me know what you think and I will consolidate into the sprint plan.\n\n- Jamie',
  },
  {
    id: 'e2',
    senderName: 'Stripe Billing',
    senderEmail: 'billing@stripe.com',
    subject: 'Your invoice for February is ready',
    preview: 'Invoice #8221 is available. Amount due: $2,480.00 due on Feb 15.',
    time: 'Yesterday',
    unread: false,
    tags: ['Billing'],
    to: ['you@secondbrain.ai'],
    body:
      'Hello,\n\nYour invoice #8221 is now available. The total amount due is $2,480.00 with a due date of Feb 15, 2026.\n\nYou can view and download the invoice in the billing portal.\n\nThanks,\nStripe Billing',
  },
  {
    id: 'e3',
    senderName: 'Rosa Chen',
    senderEmail: 'rosa@studioinfinity.com',
    subject: 'Design review feedback (batch 3)',
    preview: 'Loved the new hero treatment. I have notes on typography and spacing.',
    time: 'Mon',
    unread: true,
    tags: ['Work'],
    to: ['you@secondbrain.ai'],
    cc: ['alex@studioinfinity.com'],
    body:
      'Hi!\n\nThe hero treatment is looking sharp. Feedback for batch 3:\n- tighten the body line-height in the detail view\n- increase the contrast on muted labels\n- consider a lighter stroke on the cards\n\nHappy to jump on a quick call if helpful.\n\nRosa',
  },
  {
    id: 'e4',
    senderName: 'Mom',
    senderEmail: 'mom@gmail.com',
    subject: 'Weekend plans?',
    preview: 'Are you still coming by on Saturday? Dad is making dumplings.',
    time: 'Sun',
    unread: false,
    tags: ['Personal'],
    to: ['you@secondbrain.ai'],
    body:
      'Hi love,\n\nAre you still coming by on Saturday? Dad is making dumplings and I picked up your favorite tea.\n\nLet us know what time works best.\n\nLove,\nMom',
  },
];

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
    <SafeAreaView className="flex-1 bg-zinc-950">
      <HeaderView className="justify-between">
        <View>
          <Text className="text-2xl font-bold text-zinc-100">Inbox</Text>
          <Text className="text-xs text-zinc-400">{listCount} conversations</Text>
        </View>
        <Pressable className="rounded-full p-3 bg-zinc-900 border border-zinc-800 active:bg-zinc-800">
          <Feather name="edit-3" size={16} color="#e4e4e7" />
        </Pressable>
      </HeaderView>

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

          {/* {selectedEmail && (
            <View className="mt-2 mb-6">
              <Text className="text-sm text-zinc-400 mb-3">Selected conversation</Text>
              <EmailDetail email={selectedEmail} />
            </View>
          )} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}