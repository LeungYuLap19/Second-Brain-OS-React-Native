import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, View } from 'react-native';
import { EmailListItemData } from './email-list-item';

export interface EmailDetailData extends EmailListItemData {
  body: string;
  to: string[];
  cc?: string[];
}

interface EmailDetailProps {
  email: EmailDetailData;
}

export default function EmailDetail({ email }: EmailDetailProps) {
  return (
    <View className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-zinc-100">{email.subject}</Text>
          <View className="flex-row items-center gap-2 mt-2">
            <View className="w-9 h-9 rounded-2xl bg-zinc-800 items-center justify-center">
              <Text className="text-xs text-zinc-100">{email.senderName[0]}</Text>
            </View>
            <View>
              <Text className="text-sm text-zinc-200">{email.senderName}</Text>
              <Text className="text-xs text-zinc-500">{email.senderEmail}</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="px-3 py-1 rounded-full bg-zinc-800/70">
            <Text className="text-[10px] text-zinc-400">{email.time}</Text>
          </View>
          <Feather name="star" size={16} color="#a1a1aa" />
        </View>
      </View>

      <View className="mt-4">
        <View className="flex-row items-start gap-2">
          <Text className="text-xs text-zinc-400 w-10">To</Text>
          <Text className="text-xs text-zinc-300 flex-1">{email.to.join(', ')}</Text>
        </View>
        {email.cc && email.cc.length > 0 && (
          <View className="flex-row items-start gap-2 mt-2">
            <Text className="text-xs text-zinc-400 w-10">Cc</Text>
            <Text className="text-xs text-zinc-300 flex-1">{email.cc.join(', ')}</Text>
          </View>
        )}
      </View>

      <View className="h-px bg-zinc-800/80 my-4" />

      <Text className="text-sm text-zinc-200 leading-6">{email.body}</Text>
    </View>
  );
}
