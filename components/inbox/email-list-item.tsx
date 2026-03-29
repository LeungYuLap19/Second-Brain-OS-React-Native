import Badge from '@/components/ui/elements/badge';
import CardContainer from '@/components/ui/layout/card-container';
import { gmailLabelDisplayNames, gmailTagVariants } from '@/constants/emails';
import { formatEmailListDate } from '@/lib/utils/date-utils';
import type { EmailListItemProps } from '@/types';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

function EmailListItem({ email }: EmailListItemProps) {
  const unread = email.labelIds.includes('UNREAD');
  const senderName = email.headers.from?.name || 'Unknown';
  const time = formatEmailListDate(email.internalDate);
  const subject = email.headers.subject;
  const snippet = email.snippet;
  const labels = email.labelIds;

  return (
    <Link href={`/mail-modal?id=${email.id}`} asChild>
      <CardContainer 
        asChild 
        className="p-4 mb-4 active:bg-zinc-900"
      >
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                {unread && <View className="w-2 h-2 rounded-full bg-sky-400" />}
                <Text className="text-base font-semibold text-zinc-100" numberOfLines={1}>
                  {senderName}
                </Text>
              </View>
              <Text className="text-xs text-zinc-400">{time}</Text>
            </View>

            <Text className="text-sm font-medium text-zinc-200 mt-2" numberOfLines={1}>
              {subject}
            </Text>
            <Text className="text-xs text-zinc-400 mt-1" numberOfLines={2}>
              {snippet}
            </Text>

            {labels && labels.length > 0 && (
              <View className="flex-row items-center gap-2 mt-3 flex-wrap">
                {labels.map((label) => (
                  <Badge
                    key={label}
                    label={gmailLabelDisplayNames[label as keyof typeof gmailLabelDisplayNames] ?? label}
                    variant={gmailTagVariants[label as keyof typeof gmailLabelDisplayNames] ?? 'neutral'}
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
