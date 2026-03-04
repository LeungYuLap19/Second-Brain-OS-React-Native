import { StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video';

export default function AnimatedBackground() {
  const videoUri = useRef(require('@/assets/videos/auth-bg.mp4')).current;
  
  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true
    player.muted = true
    player.play()
  });
    
  return (
    <VideoView
      player={player}
      style={StyleSheet.absoluteFillObject}
      contentFit="cover"
      fullscreenOptions={{enable: false}}
      nativeControls={false}
    />
  )
}