import { Message } from "@/app/(tabs)/chatroom";
import { ChatHistory, Chatroom } from "@/app/history-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function convertToChatHistories(chatrooms: Chatroom[]): ChatHistory[] {
  return chatrooms.map(chatroom => ({
    id: chatroom.id,
    topic: chatroom.topic,
    lastMessage: getLastMessageContent(chatroom.messages),
    updatedAt: chatroom.updatedAt
  }));
}

function getLastMessageContent(messages: Message[]): string {
  if (messages.length === 0) {
    return "No messages yet";
  }
  
  const lastMessage = messages[messages.length - 1];
  
  // Truncate long messages for display
  const maxLength = 100;
  if (lastMessage.content.length <= maxLength) {
    return lastMessage.content;
  }
  
  return lastMessage.content.substring(0, maxLength) + "...";
}

export const getMarkdownStyles = (isDark: boolean) => {
  const textColor = isDark ? '#ffffff' : '#111827';
  const subtleText = isDark ? '#d1d5db' : '#6b7280';
  const codeBg = isDark ? '#0f172a' : '#f8fafc';
  const tableBorder = isDark ? '#253341' : '#e5e7eb';

  return {
    body: { color: textColor, fontSize: 15, lineHeight: 22 },

    /* paragraphs */
    paragraph: { 
      fontSize: 15, 
      lineHeight: 22,
      marginVertical: 6,
      color: textColor,
    },

    /* headings */
    heading1: { fontSize: 26, fontWeight: '700' as const, marginVertical: 12, color: textColor },
    heading2: { fontSize: 22, fontWeight: '700' as const, marginVertical: 10, color: textColor },
    heading3: { fontSize: 18, fontWeight: '600' as const, marginVertical: 8, color: textColor },

    /* links & emphasis */
    link: { color: isDark ? '#60a5fa' : '#3b82f6', textDecorationLine: 'underline' as const },
    strong: { fontWeight: '700' as const, color: textColor },
    em: { fontStyle: 'italic' as const, color: textColor },

    /* inline code */
    code_inline: { 
      backgroundColor: codeBg,
      fontFamily: 'monospace',
      fontSize: 13,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
      color: isDark ? '#f8fafc' : '#0f172a',
    },

    /* code blocks */
    code_block: { 
      backgroundColor: codeBg,
      fontFamily: 'monospace',
      fontSize: 13,
      padding: 12,
      borderRadius: 8,
      marginVertical: 10,
      color: isDark ? '#f8fafc' : '#0f172a',
    },
    fence: { 
      backgroundColor: codeBg,
      fontFamily: 'monospace',
      fontSize: 13,
      padding: 12,
      borderRadius: 8,
      marginVertical: 10,
      color: isDark ? '#f8fafc' : '#0f172a',
    },

    /* lists */
    list_item: {
      fontSize: 15,
      lineHeight: 22,
      marginVertical: 6,
      color: textColor,
    },
    bullet_list: { paddingLeft: 2 },
    ordered_list: { paddingLeft: 2 },

    /* horizontal rule */
    hr: {
      backgroundColor: isDark ? '#374151' : '#e6e7e9',
      height: 1,
      marginVertical: 14,
    },

    /* blockquote */
    blockquote: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
      borderLeftWidth: 4,
      borderLeftColor: isDark ? '#4b5563' : '#d1d5db',
      paddingLeft: 14,
      paddingVertical: 10,
      marginVertical: 8,
    },
    blockquote_text: { color: subtleText },

    /* tables */
    table: { borderWidth: 1, borderColor: tableBorder, borderRadius: 6, overflow: 'hidden' as const, marginVertical: 8 },
    table_row: { flexDirection: 'row' as const },
    table_cell: { padding: 8, borderRightWidth: 1, borderRightColor: tableBorder, color: textColor },

    /* images */
    image: { 
      width: '100%' as const, // Add 'as const' to width
      height: 200, 
      resizeMode: 'cover' as const,
      borderRadius: 8, 
      marginVertical: 8 
    },

    /* subtle helpers */
    small: { fontSize: 13, color: subtleText },
    list_bullet: { color: subtleText },
  };
};


const CLIENT_ID_KEY = 'clientId';

export async function getClientId() {
  let id = await AsyncStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
    await AsyncStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}