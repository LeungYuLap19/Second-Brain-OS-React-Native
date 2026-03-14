import Badge from '@/components/ui/elements/badge';
import CardContainer from '@/components/ui/layout/card-container';
import { tagVariants } from '@/constants/emails';
import type { EmailListItemProps } from '@/types';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

function EmailListItem({ email, isSelected, onPress }: EmailListItemProps) {
  return (
    <Link href={`/mail-modal?id=${email.id}`} asChild>
      <CardContainer 
        asChild 
        onPress={() => onPress(email.id)} 
        className="p-4 mb-4 active:bg-zinc-900"
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
                {email.tags.map((tag) => (
                  <Badge
                    key={tag}
                    label={tag}
                    variant={tagVariants[tag] ?? 'neutral'}
                    size="xs"
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </CardContainer>
    </Link>
  );
}

export default React.memo(EmailListItem);
