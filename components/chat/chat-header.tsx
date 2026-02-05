import { appleSignOut } from '@/lib/utils/appleAuth';
import { ChatHeaderProps } from '@/types/components';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export function ChatHeader({ isConnecting, isConnected, onReconnect, onNewChatroom }: ChatHeaderProps) {
  // temp signout

  const handleSignout = async () => {
    await appleSignOut();
    router.replace('/(auth)')
  }
  
  return (
    <View className="flex-row justify-between items-center px-6 pb-4 bg-zinc-950">
      <View className="flex-row items-center gap-4">
        <Text 
          onPress={handleSignout}
          className="text-2xl font-bold text-zinc-100">Second Brain OS</Text>
        
        {isConnecting && <ActivityIndicator size="small" color="#e5e7eb" />}
        
        {isConnected ? (
          <View className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
        ) : (
          !isConnecting && (
            <Pressable 
              onPress={onReconnect} 
              className="p-2 px-3 bg-red-500/20 rounded-full animate-pulse"
            >
              <Text className="text-xs text-red-200">Reconnect</Text>
            </Pressable>
          )
        )}
      </View>

      <View className="flex-row items-center gap-2">
        <Link href="/history-modal" asChild>
          <Pressable className="rounded-full p-3 active:bg-zinc-800">
            <AntDesign name="history" size={20} color="#e5e7eb" />
          </Pressable>
        </Link>

        <Pressable onPress={onNewChatroom} className="rounded-full p-3 active:bg-zinc-800">
          <AntDesign name="plus-circle" size={20} color="#e5e7eb" />
        </Pressable>
      </View>
    </View>
  );
}
