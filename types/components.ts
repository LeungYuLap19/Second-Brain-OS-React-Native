// Chat component props
import type { ReactNode } from 'react';
import { TextProps } from 'react-native';
import { RowMap } from 'react-native-swipe-list-view';
import { Activity } from './calendar';
import { ChatHistory, Message } from './chat';
import { FileStatus } from './files';
import { EmailDetailData, EmailListItemData } from './inbox';

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

export interface HiddenDeleteProps<T extends { id: string }> {
  rowMap: RowMap<T>;
  item: T;
  onDelete: (id: string) => void | Promise<void>;
  containerClassName?: string;
  buttonClassName?: string;
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
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface ActivityItemProps {
  activity: Activity;
  isSelected: boolean;
  onToggle: (id: string) => void;
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
