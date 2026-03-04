import { Feather } from '@expo/vector-icons';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Divider from '../ui/elements/divider';
import IconCircle from '../ui/elements/icon-circle';
import SectionLabel from '../ui/elements/section-label';
import ThemedTextInput from '../ui/elements/themed-text-input';
import FormFieldContainer from '../ui/layout/form-field-container';

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
            <SectionLabel label="Subject" />
            <ThemedTextInput
              placeholder="What is this email about?"
              className="text-xl font-semibold text-white bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800"
            />
          </View>

          {/* Recipients Section */}
          <View className="gap-3">
            <SectionLabel label="Recipients" className="mb-0" />
            
            <FormFieldContainer padding="sm" className="gap-3">
              {/* To Field */}
              <View className="flex-row items-center gap-3">
                <IconCircle size="sm" bgClassName="bg-zinc-800">
                  <Feather name="user" size={14} color="#a1a1aa" />
                </IconCircle>
                <View className="flex-1">
                  <Text className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">To</Text>
                  <ThemedTextInput
                    placeholder="recipient@example.com"
                    className="h-6 p-0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <Divider />

              {/* Cc Field */}
              <View className="flex-row items-center gap-3">
                <IconCircle size="sm" bgClassName="bg-zinc-800">
                  <Feather name="users" size={14} color="#a1a1aa" />
                </IconCircle>
                <View className="flex-1">
                  <Text className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">Cc</Text>
                  <ThemedTextInput
                    placeholder="Optional"
                    className="h-6 p-0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </FormFieldContainer>
          </View>

          {/* Body Section */}
          <View className="flex-1">
            <SectionLabel label="Message" />
            <ThemedTextInput
              placeholder="Write your email..."
              className="flex-1 bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800 leading-7 min-h-[300px]"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}