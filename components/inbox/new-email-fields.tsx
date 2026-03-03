import { Feather } from '@expo/vector-icons';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';

export default function NewEmailFields() {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 mt-4"
      keyboardVerticalOffset={100}
    >
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6">
          {/* Subject Section */}
          <View>
            <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Subject
            </Text>
            <TextInput
              placeholder="What is this email about?"
              placeholderTextColor="#52525b"
              className="text-xl font-semibold text-white bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800"
            />
          </View>

          {/* Recipients Section */}
          <View className="gap-3">
            <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">
              Recipients
            </Text>
            
            <View className="bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800 gap-3">
              {/* To Field */}
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-zinc-800 items-center justify-center">
                  <Feather name="user" size={14} color="#a1a1aa" />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">To</Text>
                  <TextInput
                    placeholder="recipient@example.com"
                    placeholderTextColor="#52525b"
                    className="text-base text-zinc-200 font-medium h-6 p-0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View className="h-px bg-zinc-800/50 w-full" />

              {/* Cc Field */}
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-zinc-800 items-center justify-center">
                  <Feather name="users" size={14} color="#a1a1aa" />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">Cc</Text>
                  <TextInput
                    placeholder="Optional"
                    placeholderTextColor="#52525b"
                    className="text-base text-zinc-200 font-medium h-6 p-0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Body Section */}
          <View className="flex-1">
            <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Message
            </Text>
            <TextInput
              placeholder="Write your email..."
              placeholderTextColor="#52525b"
              className="flex-1 bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800 text-zinc-200 text-base leading-7 min-h-[300px]"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}