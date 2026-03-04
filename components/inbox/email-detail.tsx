import type { EmailDetailProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Badge from '../ui/elements/badge';
import Divider from '../ui/elements/divider';
import IconCircle from '../ui/elements/icon-circle';
import SectionLabel from '../ui/elements/section-label';
import FormFieldContainer from '../ui/layout/form-field-container';

export default function EmailDetail({ email }: EmailDetailProps) {
  return (
    <ScrollView 
      className="flex-1 mt-4" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View className="gap-6">
        {/* Header Section */}
        <View>
          <SectionLabel label="Sender Info" />
          <FormFieldContainer>
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-row items-center gap-3">
                <IconCircle size="md" bgClassName="bg-indigo-500/20" borderClassName="border border-indigo-500/30">
                  <Text className="text-base font-semibold text-indigo-400">{email.senderName[0]}</Text>
                </IconCircle>
                <View>
                  <Text className="text-base font-medium text-zinc-200">{email.senderName}</Text>
                  <Text className="text-xs text-zinc-500">{email.senderEmail}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-2">
                <Badge label={email.time} variant="neutral" size="xs" borderClassName="border border-zinc-700" className="bg-zinc-800" />
                <Feather name="star" size={18} color="#71717a" />
              </View>
            </View>
          </FormFieldContainer>
        </View>

        {/* Recipients */}
        <View>
          <SectionLabel label="Recipients" />
          <FormFieldContainer className="gap-3">
            <View className="flex-row items-start gap-3">
              <View className="w-6 items-center pt-0.5">
                <Feather name="user" size={14} color="#71717a" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-zinc-500 font-medium mb-1">To</Text>
                <Text className="text-sm text-zinc-300">{email.to.join(', ')}</Text>
              </View>
            </View>
            
            {email.cc && email.cc.length > 0 && (
              <>
                <Divider />
                <View className="flex-row items-start gap-3">
                  <View className="w-6 items-center pt-0.5">
                    <Feather name="users" size={14} color="#71717a" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-zinc-500 font-medium mb-1">Cc</Text>
                    <Text className="text-sm text-zinc-300">{email.cc.join(', ')}</Text>
                  </View>
                </View>
              </>
            )}
          </FormFieldContainer>
        </View>

        {/* Message Body */}
        <View>
          <SectionLabel label="Message" />
          <FormFieldContainer padding="lg" className="min-h-[200px]">
            <Text className="text-zinc-200 text-base leading-7">{email.body}</Text>
          </FormFieldContainer>
        </View>
      </View>
    </ScrollView>
  );
}
