import HiddenDelete from '@/components/chat-history/hidden-delete';
import HistoryItem from '@/components/chat-history/history-item';
import { API_URL } from '@/lib/utils/server-uri';
import { getChatroomId, getClientId, getNewChatroomId } from '@/lib/utils/utilities';
import { ChatHistory } from '@/types/chat';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function HistoryModal() {
  const [histories, setHistories] = useState<ChatHistory[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    getChatHistory();
    getCurrentId();
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

  const getCurrentId = async () => {
    const id = await getChatroomId();
    setCurrentId(id);
  }

  const buildDeleteAlert = (
    title: string,
    desc: string,
    delBtnText: string,
    onPressFn: ((value?: string | undefined) => void) | ((value?: {
      login: string;
      password: string;
    } | undefined) => void) | undefined
  ) => {
    Alert.alert(
      title,
      desc,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: delBtnText,
          style: 'destructive',
          onPress: onPressFn
        },
      ],
      { cancelable: true }
    );
  }

  const clearAll = async () => {
    if (histories.length <= 0) return;
    buildDeleteAlert(
      'Clear all conversations',
      'Are you sure to erase all chat history?',
      'Clear All',
      async () => {
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
      }
    );
  };

  const handleDeleteChatroom = async (chatroomId: string) => {
    buildDeleteAlert(
      'Delete conversation',
      'Are you sure you want to delete this chat history?',
      'Delete',
      async () => {
        try {
          const client_id = await getClientId();
          const response = await fetch(`${API_URL}/delete_chatroom`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ client_id, chatroom_id: chatroomId }),
          });

          const body = await response.json();

          if (response.ok && body.success) {
            setHistories((prev) => prev.filter((item) => item.id !== chatroomId));

            if (currentId === chatroomId) {
              const id = await getNewChatroomId();
              setCurrentId(id);
              router.replace(`/(tabs)/chatroom/${id}`);
            }
          } else {
            Alert.alert('Error', body.detail || 'Failed to delete chat history');
          }
        } catch (error: any) {
          console.log('Error deleting chat history:', error);
          Alert.alert('Error', 'Failed to delete chat history. Please try again.');
        }
      }
    );
  };

  const handleNewChatroom = async () => {
    const id = await getNewChatroomId();
    router.replace(`/(tabs)/chatroom/${id}`);
  };

  return (
    <View className='flex-1 pt-12 px-6 gap-8 bg-zinc-950'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-2xl font-bold text-zinc-100'>Chat History</Text>
        <View className='flex-row items-center gap-2'>
          <Pressable 
            onPress={clearAll}
            className='rounded-full p-3 active:bg-zinc-800'
          >
            <AntDesign name="clear" size={20} color="#e5e7eb" />
          </Pressable>
          
          <Pressable 
            onPress={handleNewChatroom}
            className='rounded-full p-3 active:bg-zinc-800'
          >
            <AntDesign name="plus-circle" size={20} color="#e5e7eb" />
          </Pressable>
        </View>
      </View>
      
      <SwipeListView
        data={histories}
        keyExtractor={(item) => item.id}
        rightOpenValue={-88}
        disableRightSwipe
        closeOnRowPress
        closeOnRowOpen
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HistoryItem currentId={currentId} item={item} />
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <HiddenDelete rowMap={rowMap} item={item} handleDeleteChatroom={handleDeleteChatroom} />
        )}
      />
    </View>
  )
}