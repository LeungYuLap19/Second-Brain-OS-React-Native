import { apiFetch, AppError, getErrorMessage } from "@/lib/utils/error";
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
    try {
      const client_id = await getClientId();
      const data = await apiFetch<ChatHistory[]>(`/chat_history/${client_id}`);
      setHistories(data);
    } catch (error: unknown) {
      console.error('Failed to fetch chat history:', getErrorMessage(error));
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
          await apiFetch(`/delete_all_chatrooms`, {
            method: 'DELETE',
            body: JSON.stringify({ client_id }),
          });

          Alert.alert('Success', 'All chat history cleared');
          setHistories([]);

          const id = await getNewChatroomId();
          router.replace(`/(tabs)/chatroom/${id}`);
        } catch (error: unknown) {
          const message = error instanceof AppError && error.detail
            ? error.detail
            : 'Failed to clear history. Please try again.';
          Alert.alert('Error', message);
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
          await apiFetch(`/delete_chatroom`, {
            method: 'DELETE',
            body: JSON.stringify({ client_id, chatroom_id: chatroomId }),
          });

          setHistories((prev) => prev.filter((item) => item.id !== chatroomId));

          if (currentId === chatroomId) {
            const id = await getNewChatroomId();
            setCurrentId(id);
            router.replace(`/(tabs)/chatroom/${id}`);
          }
        } catch (error: unknown) {
          const message = error instanceof AppError && error.detail
            ? error.detail
            : 'Failed to delete chat history. Please try again.';
          Alert.alert('Error', message);
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