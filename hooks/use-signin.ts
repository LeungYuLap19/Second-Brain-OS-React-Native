// hooks/useSignIn.ts
import { appleSignIn } from '@/lib/utils/appleAuth';
import { googleSignIn } from '@/lib/utils/googleAuth';
import { PlatformType, UseSignInOptions, UseSignInReturn } from '@/types/auth';
import * as AuthSession from 'expo-auth-session';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export function useSignIn(options: UseSignInOptions = {}): UseSignInReturn {
  const [loading, setLoading] = useState(false);
  const { onSuccess, onError, showAlerts = true } = options;

  const signIn = useCallback(
    async (
      platform: PlatformType,
      redirectUri?: string,
      promptAsync?: (options?: AuthSession.AuthRequestPromptOptions | undefined) => Promise<AuthSession.AuthSessionResult>
    ): Promise<void> => {
    if (loading) return;

    setLoading(true);
    
    try {
      switch (platform) {
        case 'Apple':
          await handleAppleSignIn();
          break;
        case 'Google':
          if (!redirectUri || !promptAsync) return;
          await handleGoogleSignIn(redirectUri, promptAsync);
          break;
        case 'Email':
          await handleEmailSignIn();
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
    } catch (error: any) {
      handleError(error, platform);
    } finally {
      setLoading(false);
    }
  }, [loading, onSuccess, onError, showAlerts]);

  const handleAppleSignIn = async () => {
    const result = await appleSignIn();
    
    if (result.success && result.user) {
      console.log('Apple Sign-In Success:', result.user);
      
      // Show success alert
      if (showAlerts) {
        Alert.alert(
          'Welcome!',
          `Signed in as ${result.user.email || result.user.id}`,
          [{ text: 'OK' }]
        );
      }
      
      // Call success callback
      onSuccess?.(result.user);
    } else {
      throw new Error(result.error || 'Apple Sign-In failed');
    }
  };

  const handleGoogleSignIn = async (
    redirectUri: string,
    promptAsync: (options?: AuthSession.AuthRequestPromptOptions | undefined) => Promise<AuthSession.AuthSessionResult>
  ) => {
    const result = await googleSignIn(redirectUri, promptAsync);

    if (result.success && result.user) {
      console.log('Apple Sign-In Success:', result.user);
      
      // Show success alert
      if (showAlerts) {
        Alert.alert(
          'Welcome!',
          `Signed in as ${result.user.email || result.user.id}`,
          [{ text: 'OK' }]
        );
      }
      
      // Call success callback
      onSuccess?.(result.user);
    } else {
      throw new Error(result.error || 'Google Sign-In failed');
    }
  };

  const handleEmailSignIn = async () => {
    // Placeholder for Email sign-in
    console.log('Email sign-in clicked');
    // TODO: Implement Email sign-in
    throw new Error('Email sign-in not implemented yet');
  };

  const handleError = (error: Error, platform: PlatformType) => {
    console.error(`${platform} Sign-In Error:`, error.message);
    
    // Don't show alert for user cancellation
    const isUserCancelled = error.message.includes('cancelled');
    
    if (!isUserCancelled && showAlerts) {
      Alert.alert(
        'Sign In Failed',
        error.message || 'An error occurred during sign in'
      );
    }
    
    // Call error callback
    if (!isUserCancelled) {
      onError?.(error.message);
    }
  };

  return { loading, signIn };
}