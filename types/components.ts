// Chat component props
import type { ReactNode } from 'react';
import { PressableProps, StyleProp, TextInputProps, TextProps, ViewProps, ViewStyle } from 'react-native';
import { WithSpringConfig } from 'react-native-reanimated';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';
import { RowMap } from 'react-native-swipe-list-view';
import { Activity, ActivityForm, Priority } from './calendar';
import { ChatHistory, Message } from './chat';
import { FileStatus } from './files';
import { EmailDetailData, EmailListItemData } from './inbox';

// ── Shared UI component props ──────────────────────────────────────

export type BadgeVariant = 'sky' | 'emerald' | 'amber' | 'rose' | 'fuchsia' | 'indigo' | 'neutral';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'xs' | 'sm';
  borderClassName?: string;
  className?: string;
}

export interface SectionLabelProps {
  label: string;
  className?: string;
}

export interface FormFieldContainerProps extends ViewProps {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ThemedTextInputProps extends TextInputProps {
  className?: string;
}

export type IconCircleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconCircleShape = 'circle' | 'rounded';

export interface IconCircleProps {
  size?: IconCircleSize;
  shape?: IconCircleShape;
  bgClassName?: string;
  borderClassName?: string;
  children: ReactNode;
  className?: string;
}

export interface DividerProps {
  className?: string;
}

export interface EmptyStateProps {
  icon: React.ComponentProps<typeof import('@expo/vector-icons/Feather').default>['name'];
  message: string;
  iconColor?: string;
  className?: string;
}

export interface ModalScreenProps {
  title: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}

export interface TabScreenProps {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  scrollable?: boolean;
  contentPaddingBottom?: number;
  children: ReactNode;
}

export interface DotSeparatorProps {
  size?: 'sm' | 'md';
}

// ── Feature component props ────────────────────────────────────────

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
  title?: string;
  subtitle?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  variant?: 'page' | 'modal';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
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

export interface ActivityFieldProps {
  form: ActivityForm;
  updateField: <K extends keyof ActivityForm>(key: K, value: ActivityForm[K]) => void;
  activityId?: string;
}

export type UpdateField = ActivityFieldProps['updateField'];

export interface ActivityFormFieldProps {
  form: ActivityForm;
  updateField: UpdateField;
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

export interface MessageComposerProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder: string;
  editable?: boolean;
  onHeightChange?: (height: number) => void;
  containerClassName?: string;
  inputClassName?: string;
  sendIcon?: React.ComponentProps<typeof import('@expo/vector-icons/Feather').default>['name'];
  sendIconSize?: number;
}

export interface TypewriterTextProps extends TextProps {
  text: string | string[];
  speed?: number;
  cursorChar?: string;
  className?: string;
}

export interface ThemedTextProps extends TextProps {
  tone?: 'primary' | 'secondary' | 'muted' | 'subtle' | 'inverse';
  className?: string;
  children?: ReactNode;
}

export interface ThemedSafeAreaViewProps extends SafeAreaViewProps {
  className?: string;
  children?: ReactNode;
}

export interface ThemedViewProps extends ViewProps {
  className?: string;
  children?: ReactNode;
}

export interface AnimatedHeightViewProps {
  height: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  overflowHidden?: boolean;
  springConfig?: WithSpringConfig;
};

export interface CircleButtonProps extends PressableProps {
  children: React.ReactNode;
}

export interface CardContainerProps extends ViewProps {
  children: React.ReactNode;
  asChild?: false;
}

export interface CardPressableProps extends PressableProps {
  children: React.ReactNode;
  asChild: true;
}
export interface PrioritySelectorProps {
  value: Priority;
  onChange: (priority: Priority) => void;
}


export interface ThemedDateTimePickerProps {
  isVisible: boolean;
  value: Date;
  mode: 'date' | 'time';
  onChange: (date?: Date) => void;
  onClose: () => void;
  title?: string;
}


export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}


export type UsePagerLoopOptions<T> = {
  currentValue: T;
  getShiftedValue: (current: T, delta: -1 | 1) => T;
  onChange: (next: T) => void;
};

