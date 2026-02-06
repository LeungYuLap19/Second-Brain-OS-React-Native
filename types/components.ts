// Chat component props
import type { ReactNode } from 'react';
import { RowMap } from 'react-native-swipe-list-view';
import { ChatHistory, Message } from './chat';

export interface ChatHeaderProps {
  isConnecting: boolean;
  isConnected: boolean;
  onReconnect: () => void;
  onNewChatroom: () => void;
}

export interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isConnected: boolean;
  onHeightChange: (height: number) => void;
}

export interface MessageItemProps {
  message: Message;
  isStreaming: boolean;
}

export interface MessageListProps {
  messages: Message[];
  currentAssistantMessageId: string | null;
  inputHeight: number;
}

export interface SigninButtonProps {
  platform: 'Apple' | 'Google' | 'Email';
}

export interface HistoryItemProps {
  currentId: string | null;
  item: ChatHistory;
}

export interface HiddenDeleteProps {
  rowMap: RowMap<ChatHistory>;
  item: ChatHistory;
  handleDeleteChatroom: (chatroomId: string) => Promise<void>;
}

export interface HistoryHeaderProps {
  clearAll: () => Promise<void>;
  handleNewChatroom: () => Promise<void>;
}

export interface HeaderViewProps {
  className?: string;
  children?: ReactNode;
}