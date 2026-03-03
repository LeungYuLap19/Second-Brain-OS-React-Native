import type { EmailDetailProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

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
          <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Sender Info
          </Text>
          <View className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-indigo-500/20 items-center justify-center border border-indigo-500/30">
                  <Text className="text-base font-semibold text-indigo-400">{email.senderName[0]}</Text>
                </View>
                <View>
                  <Text className="text-base font-medium text-zinc-200">{email.senderName}</Text>
                  <Text className="text-xs text-zinc-500">{email.senderEmail}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-2">
                <View className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700">
                  <Text className="text-[10px] font-medium text-zinc-400">{email.time}</Text>
                </View>
                <Feather name="star" size={18} color="#71717a" />
              </View>
            </View>
          </View>
        </View>

        {/* Recipients */}
        <View>
          <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Recipients
          </Text>
          <View className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 gap-3">
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
                <View className="h-px bg-zinc-800/50" />
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
          </View>
        </View>

        {/* Message Body */}
        <View>
          <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Message
          </Text>
          <View className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800 min-h-[200px]">
            <Text className="text-zinc-200 text-base leading-7">{email.body}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
