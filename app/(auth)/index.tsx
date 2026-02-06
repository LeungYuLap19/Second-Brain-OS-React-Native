import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TypeWriter from '@/components/ui/typewriter';
import SigninButton from '@/components/ui/siginin-button';
import { Platform } from 'react-native';
import AnimatedBackground from '@/components/ui/animated-background';

export default function Auth() {
  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      <AnimatedBackground />
      
      <View className="absolute inset-0 bg-black/50" />
      
      <View className="flex-1 relative z-10 justify-center items-center gap-4">
        <Text className="text-zinc-300 text-4xl font-bold">
          Second Brain OS
        </Text>
        <TypeWriter text={'Organize Your Thoughts'} className='text-zinc-300/60 font-sanscode text-sm' />
      </View>

      <View className='flex-0 relative z-10 justify-center items-center gap-4 px-4 pb-4'>
        { Platform.OS == 'ios' && <SigninButton platform='Apple' /> }
        {/* <SigninButton platform='Google' />
        <SigninButton platform='Email' /> */}

        <Text className='text-zinc-300/50 text-sm '>
          <Text className='font-bold'>Second Brain OS</Text>
          <Text> Beta Version</Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}