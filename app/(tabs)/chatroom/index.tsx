import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
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
      content: 'Hey! Here is Mochi 😸 and Second Brain OS 🧠. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [inputHeight, setInputHeight] = useState<number>(48);
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content: input.trim(),
        timestamp: new Date()
      }
    ]);

    setInput('');

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }

  return (
    <KeyboardAvoidingView 
      className='h-screen-safe-offset-6'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}
    >
      <SafeAreaView className='flex-1'>
        <View className='flex-row justify-between items-center px-6 pb-4'>
          <Text className='text-2xl font-bold'>Assistant</Text>
          <Link href={'/history-modal'} asChild>
            <Pressable className='rounded-full p-3 active:bg-zinc-200'>
              <AntDesign name="history" size={20} color="black" />
            </Pressable>
          </Link>
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
                      p-4 rounded-3xl
                      ${isUser ? 'bg-zinc-800' : 'bg-zinc-100'}
                    `}
                  >
                    <Text
                      className={`
                        leading-relaxed
                        ${isUser ? 'text-white' : 'text-black'}
                      `}
                    >
                      {message.content}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View className={'flex-row items-end gap-2 pt-4 px-6'}>
          <TextInput 
            placeholder='Enter anything here...'
            className='flex-1 border bg-zinc-100/90 border-transparent rounded-3xl min-h-12 max-h-24 placeholder:text-zinc-600 p-4'
            onChangeText={setInput}
            value={input}
            ref={inputRef}
            returnKeyType='send'
            multiline
            onLayout={(event: any) => {
              const { height } = event.nativeEvent.layout;
              setInputHeight(height);
            }}
          />
          <Pressable 
            onPress={handleSend}
            className='rounded-full p-3 bg-zinc-100/90 active:bg-zinc-200'
          >
            <Feather name="send" size={20} color="black" />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}