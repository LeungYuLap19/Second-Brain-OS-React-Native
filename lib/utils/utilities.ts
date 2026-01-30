import { Message } from "@/app/(tabs)/chatroom";
import { ChatHistory, Chatroom } from "@/app/history-modal";

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
  const textColor = isDark ? '#ffffff' : '#000000';
  const codeBg = isDark ? '#374151' : '#f3f4f6';
  
  return {
    body: { color: textColor, fontSize: 14, lineHeight: 20 },
    paragraph: { 
      fontSize: 14, 
      lineHeight: 20,
      marginVertical: 4,
      color: textColor,
    },
    code_inline: { 
      backgroundColor: codeBg,
      fontFamily: 'monospace',
      fontSize: 14,
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 3,
      color: textColor,
    },
    code_block: { 
      backgroundColor: codeBg,
      fontFamily: 'monospace',
      fontSize: 14,
      padding: 12,
      borderRadius: 6,
      marginVertical: 8,
      color: textColor,
    },
    fence: { 
      backgroundColor: codeBg,
      fontFamily: 'monospace',
      fontSize: 14,
      padding: 12,
      borderRadius: 6,
      marginVertical: 8,
      color: textColor,
    },
    link: { 
      color: isDark ? '#60a5fa' : '#3b82f6',
    },
    strong: { 
      fontWeight: 'bold' as const,
      color: textColor,
    },
    em: { 
      fontStyle: 'italic' as const,
      color: textColor,
    },
    list_item: {
      fontSize: 16,
      lineHeight: 24,
      color: textColor,
    },
    hr: {
      backgroundColor: isDark ? '#4b5563' : '#d1d5db',
      height: 1,
      marginVertical: 12,
    },
    blockquote: {
      backgroundColor: isDark ? '#374151' : '#f8f9fa',
      borderLeftWidth: 4,
      borderLeftColor: isDark ? '#4b5563' : '#d1d5db',
      paddingLeft: 12,
      paddingVertical: 8,
      marginVertical: 8,
    },
  };
};