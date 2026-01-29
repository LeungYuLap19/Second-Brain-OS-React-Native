import { View, Text, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VideoView, useVideoPlayer } from 'expo-video'
import TypeWriter from '@/components/ui/typewriter';
import SigninButton from '@/components/siginin-button';
import { Platform } from 'react-native';

export default function Auth() {
  const videoUri = useRef(require('@/assets/videos/auth-bg.mp4')).current;

  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true
    player.muted = true
    player.play()
  });

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      <VideoView
        player={player}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        fullscreenOptions={{enable: false}}
        nativeControls={false}
      />
      
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