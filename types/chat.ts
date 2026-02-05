// Message types for chatroom functionality
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface WebSocketMessage {
  data: string;
  hasStart: boolean;
  hasEnd: boolean;
}

// Chat history types
export interface ChatHistory {
  id: string;
  first_message: string;
  last_message: string;
  updated_at: string;
}

export interface Chatroom {
  id: string;
  client_id: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}
