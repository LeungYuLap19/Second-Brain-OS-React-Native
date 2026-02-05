// Chat component props
import { Message } from './chat';

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
