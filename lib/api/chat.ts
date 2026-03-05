import { apiFetch } from '@/lib/api/client';
import { ChatHistory } from '@/types';

export const chatApi = {
  getHistory: (clientId: string) =>
    apiFetch<ChatHistory[]>(`/chat_history/${clientId}`),

  deleteChatroom: (clientId: string, chatroomId: string) =>
    apiFetch(`/delete_chatroom`, {
      method: 'DELETE',
      body: JSON.stringify({ client_id: clientId, chatroom_id: chatroomId }),
    }),

  deleteAllChatrooms: (clientId: string) =>
    apiFetch(`/delete_all_chatrooms`, {
      method: 'DELETE',
      body: JSON.stringify({ client_id: clientId }),
    }),
};
