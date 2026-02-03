import { Chatroom } from '@/app/history-modal';
import URLHelper from '@/lib/utils/url-helper';
import { getClientId, getNewChatroomId, getChatroomId, getMarkdownStyles } from '@/lib/utils/utilities';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: 'assistant', 
      content: 'Hey! Here is Mochi 😸! How can I help you today?',
      timestamp: Date.now().toString(),
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [inputHeight, setInputHeight] = useState<number>(48);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currentAssistantMessageId, setCurrentAssistantMessageId] = useState<string | null>(null);
  const [chatroomId, setChatroomId] = useState<string | null>(null);

  const currentAssistantMessageIdRef = useRef<string | null>(null);
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    initChatroom()
  }, [])

  // WebSocket connection
  useEffect(() => {
    if (chatroomId) {
      connectWebSocket(chatroomId);
    }
    
    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [chatroomId]);

  const retrieveChatroom = async (id: string) => {
    try {
      const response = await URLHelper.fetchFromApi(`/retrieve_chatroom/${id}`, {
        method: 'GET'
      });
      const body = await response.json();
      if (response.ok && body.success) {
        const chatroom: Chatroom = body.data;
        setMessages(prev => [...prev, ...chatroom.messages]);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  const initChatroom = async () => {
    if (socket) {
      socket.close();
    }

    const id = await getChatroomId();
    setChatroomId(id);
    setInput('');
    setInputHeight(48);
    await retrieveChatroom(id);
  }

  const createNewChatroom = async () => {
    if (socket) {
      socket.close();
    }
    const id = await getNewChatroomId();
    setChatroomId(id);
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant', 
      content: 'Hey! Here is Mochi 😸! How can I help you today?',
      timestamp: Date.now().toString(),
    }]);
    setInput('');
    setInputHeight(48);
  }

  const connectWebSocket = async (chatroomId: string) => {
    setIsConnecting(true);
    const clientid = await getClientId();

    const ws = new WebSocket(URLHelper.getWebSocketUrl(clientid, chatroomId));

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnecting(false);
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
      setIsConnecting(false);
      setCurrentAssistantMessageId(null);
      currentAssistantMessageIdRef.current = null;
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnecting(false);
    };

    ws.onmessage = (event) => {
      let data: any = event.data;

      if (typeof data !== 'string') {
        try {
          data = String(data);
        } catch {
          return;
        }
      }

      const hasStart = data.includes('<RESPONSE_START>');
      const hasEnd = data.includes('<END_OF_STREAM>');

      // Remove protocol markers
      data = data
        .replace(/<RESPONSE_START>/g, '')
        .replace(/<END_OF_STREAM>/g, '');

      if (hasStart) {
        // Remove the placeholder message that was added when the user sent their request
        if (currentAssistantMessageIdRef.current) {
          const oldId = currentAssistantMessageIdRef.current;
          setMessages(prev => prev.filter(msg => msg.id !== oldId));
        }

        // Start a fresh streaming message (tokens after <RESPONSE_START> will be appended)
        const id = Date.now().toString();
        currentAssistantMessageIdRef.current = id;
        setCurrentAssistantMessageId(id);

        setMessages(prev => [
          ...prev,
          {
            id,
            role: 'assistant',
            content: '',
            timestamp: Date.now().toString()
          }
        ]);
      }

      if (data && data.trim() !== '') {
        const id = currentAssistantMessageIdRef.current;
        if (!id) return;

        setMessages(prev =>
          prev.map(msg =>
            msg.id === id
              ? { ...msg, content: msg.content + data }
              : msg
          )
        );
      }

      if (hasEnd) {
        console.log('Stream ended');
        setCurrentAssistantMessageId(null);
        currentAssistantMessageIdRef.current = null;
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
      timestamp: Date.now().toString()
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
      content: '',
      timestamp: Date.now().toString()
    }]);
  };

  const reconnect = () => {
    if (socket) {
      socket.close();
    }
    if (chatroomId){
      connectWebSocket(chatroomId);
    }
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
          <View className='flex-row items-center gap-4'>
            <Text className='text-2xl font-bold'>Second Brain OS</Text>
            {isConnecting && (
              <ActivityIndicator size="small" color="#000" />
            )}
            {socket && socket.readyState === WebSocket.OPEN ? (
              <View className='w-3 h-3 rounded-full bg-green-500 animate-pulse' />
            ) : (
              <Pressable onPress={reconnect} className='p-2 px-3 bg-red-100 rounded-full animate-pulse'>
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

            <Pressable 
              onPress={createNewChatroom}
              className='rounded-full p-3 active:bg-zinc-200'
            >
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
                key={message.timestamp}
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
                      ${isStreaming ? 'border border-zinc-300 py-4' : ''}
                    `}
                  >
                    {isStreaming && message.content === '' ? (
                      <View className='flex-row items-center gap-1'>
                        <ActivityIndicator size="small" color="#a1a1aa" />
                        <Text className='text-zinc-400'>Thinking...</Text>
                      </View>
                    ) : (
                      <>
                        <Markdown style={isUser ? getMarkdownStyles(true) : getMarkdownStyles(false)}>
                          {message.content}
                        </Markdown>
                        {isStreaming && (
                          <View className='absolute bottom-1 right-0'>
                            <View className='w-3 h-3 rounded-full bg-zinc-400 animate-pulse' />
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
            className={`flex-1 border bg-zinc-100 border-transparent rounded-3xl min-h-12 max-h-24 placeholder:text-zinc-400 p-4 shadow-md ${
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
            className={`rounded-full p-3 shadow-md bg-zinc-100 active:bg-zinc-200`}
          >
            <Feather 
              name="arrow-up" 
              size={24} 
              color={(!input.trim() || !socket || socket.readyState !== WebSocket.OPEN) ? '#a1a1aa' : 'black'} 
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}