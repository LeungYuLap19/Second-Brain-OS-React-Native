// Chat component props
import type { ReactNode } from 'react';
import { RowMap } from 'react-native-swipe-list-view';
import { ChatHistory, Message } from './chat';
import { Activity, MonthMatrix } from './calendar';
import { FileStatus } from './files';
import { EmailDetailData, EmailListItemData } from './inbox';
import { TextProps } from 'react-native';

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

export interface WeekRowProps {
  days: Date[];
  selectedDate: Date;
  activities: Record<string, Activity[]>;
  onSelectDate: (date: Date) => void;
}

export interface WeekViewProps {
  selectedDate: Date;
  activities: Record<string, Activity[]>;
  onSelectDate: (date: Date) => void;
}

export interface MonthBlockProps {
  monthDate: Date;
  selectedDate: Date;
  activities: Record<string, Activity[]>;
  onSelectDate: (date: Date) => void;
}

export interface MonthViewProps {
  monthDate: Date;
  selectedDate: Date;
  activities: Record<string, Activity[]>;
  onSelectDate: (date: Date) => void;
}

export interface TodaysActivitiesProps {
  selectedDate: Date;
  dayActivities: Activity[];
}

export interface FileStatusPillProps {
  status: FileStatus;
}

export interface FileItemProps {
  name: string;
  size: string;
  type: string;
  status: FileStatus;
  updatedAt: string;
}

export interface UploadCardProps {
  onUpload?: () => void;
}

export interface EmailListItemProps {
  email: EmailListItemData;
  isSelected: boolean;
  onPress: (id: string) => void;
}
export interface EmailDetailProps {
  email: EmailDetailData;
}

export interface ReplyBoxProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export interface TypewriterTextProps extends TextProps {
  text: string | string[];
  speed?: number;
  cursorChar?: string;
  className?: string;
}
