import { Pressable, Text } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSignIn } from '@/hooks/use-signin';

type PlatformType = 'Apple' | 'Google' | 'Email';

interface SigninButtonProps {
  platform: PlatformType;
}

export default function SigninButton({ platform }: SigninButtonProps) {
  const { loading, signIn } = useSignIn();
  
  const getPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case 'Apple':
        return <Ionicons name="logo-apple" size={20} color="#D4D4D8" />; // zinc-300
      case 'Google':
        return <FontAwesome name="google" size={20} color="#D4D4D8" />; // zinc-300
      case 'Email':
        return <MaterialCommunityIcons name="email-outline" size={20} color="#D4D4D8" />; // zinc-300
      default:
        return null;
    }
  };

  return (
    <Pressable
      onPress={() => signIn(platform)}
      disabled={loading}
      className={`bg-zinc-900/80 rounded-full py-5 flex-row items-center justify-center active:bg-zinc-800/80 active:opacity-90 w-full`}
    >
      {getPlatformIcon(platform)}
      <Text className="ml-3 font-medium text-zinc-300">
        Continue with {platform}
      </Text>
    </Pressable>
  );
}