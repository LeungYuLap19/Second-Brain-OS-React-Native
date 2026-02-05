import { API_URL } from '@/lib/utils/server-uri';
import { getClientId, getNewChatroomId, setChatroomId } from '@/lib/utils/utilities';
import { ChatHistory } from '@/types/chat';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

export default function HistoryModal() {
  const [histories, setHistories] = useState<ChatHistory[]>([]);

  useEffect(() => {
    getChatHistory()
  }, []);

  const getChatHistory = async () => {
    const client_id = await getClientId();
    try {
      const response = await fetch(`${API_URL}/chat_history/${client_id}`, {
        method: 'GET'
      });
      const body = await response.json();
      if (response.ok && body.success) {
        setHistories(body.data)
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  const clearAll = async () => {
    Alert.alert(
      'Clear all conversations',
      'Are you sure to erase all chat history?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              const client_id = await getClientId();
              
              const response = await fetch(`${API_URL}/delete_all_chatrooms`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ client_id }),
              });
              
              const body = await response.json();
              
              if (response.ok && body.success) {
                Alert.alert('Success', 'All chat history cleared');
                setHistories([]);
                
                const id = await getNewChatroomId();
                router.replace(`/(tabs)/chatroom/${id}`);
              } else {
                Alert.alert('Error', body.detail || 'Failed to clear history');
              }
            } catch (error: any) {
              console.log('Error clearing chat history:', error);
              Alert.alert('Error', 'Failed to clear history. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className='flex-1 pt-12 px-6 gap-8'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-2xl font-bold'>Chat History</Text>
        <View className='flex-row items-center gap-2'>
          <Pressable 
            onPress={clearAll}
            className='rounded-full p-3 active:bg-zinc-200'
          >
            <AntDesign name="clear" size={20} color="black" />
          </Pressable>
          
          <Pressable className='rounded-full p-3 active:bg-zinc-200'>
            <AntDesign name="plus-circle" size={20} color="black" />
          </Pressable>
        </View>
      </View>
      
      <ScrollView 
        className='flex-1'
        contentContainerStyle={{'paddingBottom': 40}}
        showsVerticalScrollIndicator={false}
      >
        {
          histories.map((history) => (
            <Pressable 
              key={history.id}
              onPress={async () => {
                await setChatroomId(history.id);
                router.replace(`/(tabs)/chatroom/${history.id}`);
              }}
              className='p-4 w-full rounded-3xl bg-zinc-200 flex-col mb-4'
            >
              <View className='flex-row justify-between items-center pr-2'>
                <Text className='text-lg font-medium w-4/5 line-clamp-1'>{history.first_message}</Text>

                <Pressable>
                  <Entypo name="dots-three-horizontal" size={16} color="#52525b" />
                </Pressable>
              </View>
              
              <Text className='text-lg text-zinc-600 mb-4 line-clamp-2'>{history.last_message}</Text>
              <View className='flex-row gap-2'>
                <AntDesign name="field-time" size={16} color="#52525b" />
                <Text className='text-sm text-zinc-600'>{history.updated_at}</Text>
              </View>
            </Pressable>
          ))
        }
      </ScrollView>
    </View>
  )
}