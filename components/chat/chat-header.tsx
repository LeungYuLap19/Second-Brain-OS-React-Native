import { ChatHeaderProps } from '@/types/components';
import { Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import CircleButton from '../ui/circle-button';
import Header from '../ui/header';

export function ChatHeader({ isConnecting, isConnected, onReconnect, onNewChatroom }: ChatHeaderProps) {
  return (
    <Header
      leftSlot={
        <View className="flex-row items-center gap-3">
          <Text className="text-2xl font-bold text-zinc-100">Second Brain OS</Text>
          
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
      }
      rightSlot={
        <View className="flex-row items-center gap-2">
          <Link href="/history-modal" asChild>
            <CircleButton>
              <AntDesign name="history" size={18} color="#e4e4e7" />
            </CircleButton>
          </Link>

          <CircleButton onPress={onNewChatroom}>
            <Feather name="plus" size={18} color="#e4e4e7" />
          </CircleButton>
        </View>
      }
    />
  );
}
