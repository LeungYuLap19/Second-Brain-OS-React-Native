import type { EmailListItemData, EmailListItemProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const tagStyles: Record<string, { bg: string; text: string }> = {
  Work: { bg: 'bg-sky-500/15', text: 'text-sky-200' },
  Product: { bg: 'bg-emerald-500/15', text: 'text-emerald-200' },
  Billing: { bg: 'bg-amber-500/15', text: 'text-amber-200' },
  Personal: { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-200' },
};

export default function EmailListItem({ email, isSelected, onPress }: EmailListItemProps) {
  const containerClass = isSelected
    ? 'bg-zinc-900 border-zinc-700'
    : 'bg-zinc-950 border-zinc-800';

  return (
    <Pressable
      onPress={() => onPress(email.id)}
      className={`p-4 rounded-3xl border ${containerClass} mb-4 active:bg-zinc-900`}
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              {email.unread && <View className="w-2 h-2 rounded-full bg-sky-400" />}
              <Text className="text-base font-semibold text-zinc-100" numberOfLines={1}>
                {email.senderName}
              </Text>
              <Text className="text-xs text-zinc-500" numberOfLines={1}>
                {email.senderEmail}
              </Text>
            </View>
            <Text className="text-xs text-zinc-400">{email.time}</Text>
          </View>

          <Text className="text-sm font-medium text-zinc-200 mt-2" numberOfLines={1}>
            {email.subject}
          </Text>
          <Text className="text-xs text-zinc-400 mt-1" numberOfLines={2}>
            {email.preview}
          </Text>

          {email.tags && email.tags.length > 0 && (
            <View className="flex-row items-center gap-2 mt-3 flex-wrap">
              {email.tags.map((tag) => {
                const styles = tagStyles[tag] ?? {
                  bg: 'bg-zinc-800/70',
                  text: 'text-zinc-300',
                };
                return (
                  <View key={tag} className={`px-2 py-1 rounded-full ${styles.bg}`}>
                    <Text className={`text-[10px] font-semibold ${styles.text}`}>{tag}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <View className="w-9 h-9 rounded-2xl bg-zinc-900 border border-zinc-800 items-center justify-center">
          <Feather name="chevron-right" size={16} color="#a1a1aa" />
        </View>
      </View>
    </Pressable>
  );
}
