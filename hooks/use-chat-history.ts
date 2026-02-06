import { API_URL } from "@/lib/utils/server-uri";
import { getChatroomId, getClientId, getNewChatroomId } from "@/lib/utils/utilities";
import { ChatHistory } from "@/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function useChatHistory() {
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

  const handleNewChatroom = async () => {
    const id = await getNewChatroomId();
    router.replace(`/(tabs)/chatroom/${id}`);
  };

  // delete logics

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

  return {
    histories,
    currentId,
    handleNewChatroom,
    clearAll,
    handleDeleteChatroom,
  }
}