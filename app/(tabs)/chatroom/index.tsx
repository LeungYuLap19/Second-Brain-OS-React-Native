import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';
import { getMarkdownStyles } from '@/lib/utils/utilities';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: 'assistant', 
      content: 'Hey! Here is Mochi 😸! How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [inputHeight, setInputHeight] = useState<number>(48);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currentAssistantMessageId, setCurrentAssistantMessageId] = useState<string | null>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);
  
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // WebSocket connection
  useEffect(() => {
    connectWebSocket();
    
    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    setIsConnecting(true);
    
    // Use wss:// for production, ws:// for local development
    const ws = new WebSocket('ws://192.168.1.240:8000/ws/chat');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnecting(false);
      setSocket(ws);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
      setIsConnecting(false);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnecting(false);
    };
    
    ws.onmessage = (event) => {
      const data = event.data;
      
      if (data === '[[END]]') {
        console.log('Stream ended');
        setCurrentAssistantMessageId(null);
        currentAssistantMessageIdRef.current = null;
        return;
      }
      
      if (currentAssistantMessageIdRef.current) {
        const id = currentAssistantMessageIdRef.current;
        setMessages(prev => prev.map(msg => {
          if (msg.id === id) {
            return {
              ...msg,
              content: msg.content + data
            };
          }
          return msg;
        }));
      } else {
        const newMessageId = Date.now().toString();
        setCurrentAssistantMessageId(newMessageId);
        currentAssistantMessageIdRef.current = newMessageId;
        setMessages(prev => [...prev, {
          id: newMessageId,
          role: 'assistant',
          content: data,
          timestamp: new Date()
        }]);
      }
    }; 
    
    setSocket(ws);
  };

  const handleSend = () => {
    if (!input.trim() || !socket || socket.readyState !== WebSocket.OPEN) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Send message via WebSocket
    socket.send(input.trim());
    
    // Clear input
    setInput('');
    
    // Add placeholder for assistant response
    const placeholderId = (Date.now() + 1).toString();
    setCurrentAssistantMessageId(placeholderId);
    currentAssistantMessageIdRef.current = placeholderId;
    setMessages(prev => [...prev, {
      id: placeholderId,
      role: 'assistant',
      content: '...',
      timestamp: new Date()
    }]);
  };

  const reconnect = () => {
    if (socket) {
      socket.close();
    }
    connectWebSocket();
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView 
      className='h-screen-safe-offset-6'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}
    >
      <SafeAreaView className='flex-1'>
        <View className='flex-row justify-between items-center px-6 pb-4'>
          <View className='flex-row items-center gap-2'>
            <Text className='text-2xl font-bold'>Assistant</Text>
            {isConnecting && (
              <ActivityIndicator size="small" color="#000" />
            )}
            {socket && socket.readyState === WebSocket.OPEN ? (
              <View className='w-2 h-2 rounded-full bg-green-500' />
            ) : (
              <Pressable onPress={reconnect} className='px-2 py-1 bg-red-100 rounded'>
                <Text className='text-xs text-red-600'>Reconnect</Text>
              </Pressable>
            )}
          </View>
          
          <View className='flex-row items-center gap-2'>
            <Link href={'/history-modal'} asChild>
              <Pressable className='rounded-full p-3 active:bg-zinc-200'>
                <AntDesign name="history" size={20} color="black" />
              </Pressable>
            </Link>

            <Pressable className='rounded-full p-3 active:bg-zinc-200'>
              <AntDesign name="plus-circle" size={20} color="black" />
            </Pressable>
          </View>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          className="flex-grow w-full px-6"
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
          style={{ marginBottom: -inputHeight*4 }}
          contentContainerStyle={{ paddingBottom: inputHeight*4 }}
        >
          {messages.map((message) => {
            const isUser = message.role === 'user';
            const isStreaming = !isUser && message.id === currentAssistantMessageId;

            return (
              <View
                key={message.id}
                className={`mb-6 flex ${isUser ? 'items-end' : 'items-start'}`}
              >
                <View
                  className={`
                    flex-row items-start gap-3 max-w-[85%]
                    ${isUser ? 'flex-row-reverse self-end' : 'self-start'}
                  `}
                >
                  <View
                    className={`
                      w-8 h-8 rounded-full items-center justify-center flex-shrink-0
                      ${isUser ? 'bg-zinc-100' : 'bg-zinc-800'}
                    `}
                  >
                    <Text className={`text-xs ${isUser ? 'text-zinc-700' : 'text-white'}`}>
                      {isUser ? '🤡' : '😸'}
                    </Text>
                  </View>

                  <View
                    className={`
                      p-4 py-2 rounded-3xl relative
                      ${isUser ? 'bg-zinc-800' : 'bg-zinc-100'}
                      ${isStreaming ? 'border border-zinc-300' : ''}
                    `}
                  >
                    {isStreaming && message.content === '...' ? (
                      <View className='flex-row items-center gap-1'>
                        <ActivityIndicator size="small" color="#52525b" />
                        <Text className='text-zinc-600'>Thinking...</Text>
                      </View>
                    ) : (
                      <>
                        <Markdown style={isUser ? getMarkdownStyles(true) : getMarkdownStyles(false)}>
                          {message.content}
                        </Markdown>
                        {isStreaming && (
                          <View className='absolute -bottom-1 right-2'>
                            <View className='w-2 h-2 rounded-full bg-zinc-400 animate-pulse' />
                          </View>
                        )}
                      </>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View className={'flex-row items-end gap-2 pt-4 px-6'}>
          <TextInput 
            placeholder={!socket || socket.readyState !== WebSocket.OPEN ? 'Connecting...' : 'Enter anything here...'}
            className={`flex-1 border bg-zinc-100/90 border-transparent rounded-3xl min-h-12 max-h-24 placeholder:text-zinc-600 p-4 ${
              (!socket || socket.readyState !== WebSocket.OPEN) ? 'opacity-50' : ''
            }`}
            onChangeText={setInput}
            value={input}
            ref={inputRef}
            returnKeyType='send'
            multiline
            editable={socket?.readyState === WebSocket.OPEN}
            onSubmitEditing={handleSend}
            onLayout={(event: any) => {
              const { height } = event.nativeEvent.layout;
              setInputHeight(height);
            }}
          />
          <Pressable 
            onPress={handleSend}
            disabled={!input.trim() || !socket || socket.readyState !== WebSocket.OPEN}
            className={`rounded-full p-3 ${
              (!input.trim() || !socket || socket.readyState !== WebSocket.OPEN)
                ? 'bg-zinc-100/50'
                : 'bg-zinc-100/90 active:bg-zinc-200'
            }`}
          >
            <Feather 
              name="send" 
              size={20} 
              color={(!input.trim() || !socket || socket.readyState !== WebSocket.OPEN) ? '#a1a1aa' : 'black'} 
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}