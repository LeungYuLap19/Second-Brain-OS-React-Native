import AnimatedBackground from '@/components/ui/animated-background';
import SigninButton from '@/components/ui/siginin-button';
import ThemedSafeAreaView from '@/components/ui/themed-safe-area-view';
import TypeWriter from '@/components/ui/typewriter';
import React from 'react';
import { Platform, Text, View } from 'react-native';

export default function Auth() {
  return (
    <ThemedSafeAreaView>
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
    </ThemedSafeAreaView>
  )
}