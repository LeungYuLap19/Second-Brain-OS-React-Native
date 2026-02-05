import { ChatHeaderProps } from '@/types/components';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export function ChatHeader({ isConnecting, isConnected, onReconnect, onNewChatroom }: ChatHeaderProps) {
  return (
    <View className="flex-row justify-between items-center px-6 pb-4">
      <View className="flex-row items-center gap-4">
        <Text className="text-2xl font-bold">Second Brain OS</Text>
        
        {isConnecting && <ActivityIndicator size="small" color="#000" />}
        
        {isConnected ? (
          <View className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        ) : (
          !isConnecting && (
            <Pressable 
              onPress={onReconnect} 
              className="p-2 px-3 bg-red-100 rounded-full animate-pulse"
            >
              <Text className="text-xs text-red-600">Reconnect</Text>
            </Pressable>
          )
        )}
      </View>

      <View className="flex-row items-center gap-2">
        <Link href="/history-modal" asChild>
          <Pressable className="rounded-full p-3 active:bg-zinc-200">
            <AntDesign name="history" size={20} color="black" />
          </Pressable>
        </Link>

        <Pressable onPress={onNewChatroom} className="rounded-full p-3 active:bg-zinc-200">
          <AntDesign name="plus-circle" size={20} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
