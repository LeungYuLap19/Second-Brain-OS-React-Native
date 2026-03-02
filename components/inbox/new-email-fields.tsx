import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default function NewEmailFields() {
  return (
    <View className="flex-1 mt-2">
      <View className="py-3 border-b border-zinc-800">
        <View className="flex-row items-center gap-3">
          <Text className="text-sm font-medium text-zinc-400 w-14">To</Text>
          <TextInput
            placeholder="recipient@example.com"
            placeholderTextColor="#71717a"
            className="flex-1 text-base text-zinc-100 py-1"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="py-3 border-b border-zinc-800">
        <View className="flex-row items-center gap-3">
          <Text className="text-sm font-medium text-zinc-400 w-14">Cc</Text>
          <TextInput
            placeholder="optional"
            placeholderTextColor="#71717a"
            className="flex-1 text-base text-zinc-100 py-1"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="py-3 border-b border-zinc-800">
        <View className="flex-row items-center gap-3">
          <Text className="text-sm font-medium text-zinc-400 w-14">Subject</Text>
          <TextInput
            placeholder="Write a subject"
            placeholderTextColor="#71717a"
            className="flex-1 text-base text-zinc-100 py-1"
          />
        </View>
      </View>

      <View className="py-4 flex-1">
        <TextInput
          placeholder="Write your email..."
          placeholderTextColor="#71717a"
          className="text-zinc-100 h-full"
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}