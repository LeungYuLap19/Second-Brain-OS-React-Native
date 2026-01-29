import { Alert, Pressable, Text } from 'react-native'
import React, { useMemo } from 'react'
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSignIn } from '@/hooks/use-signin';
import * as AuthSession from 'expo-auth-session';
import { clientIds, googleDiscovery } from '@/lib/utils/googleAuth';
import { router } from 'expo-router';

type PlatformType = 'Apple' | 'Google' | 'Email';

interface SigninButtonProps {
  platform: PlatformType;
}

export default function SigninButton({ platform }: SigninButtonProps) {
  const { loading, signIn } = useSignIn({
    onSuccess: () => {
      router.replace('/(tabs)/chatroom');
    }
  });

  const redirectUri = useMemo(() => {
    const uri = AuthSession.makeRedirectUri();
    
    if (!uri.startsWith('https://')) {
      return 'https://auth.expo.io/@anonymous/Second-Brain-OS-Mobile';
    }
    
    return uri;
  }, []); 

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: clientIds.ios!!,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
    }, 
    googleDiscovery
  );
  
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

  const handleHybridSignIn = (platform: PlatformType) => {
    if (platform == 'Google') {
      if (!clientIds.ios) {
        Alert.alert(
          'Sign In Failed',
          'Google Client ID for iOS is not configured. Please check your environment variables.'
        );
        return;
      }

      signIn(platform, redirectUri, promptAsync);
    }
    else {
      signIn(platform);
    }
  }

  return (
    <Pressable
      onPress={() => handleHybridSignIn(platform)}
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