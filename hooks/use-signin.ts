// hooks/useSignIn.ts
import { getErrorMessage } from '@/lib/api/clients/base-client';
import { appleSignIn } from '@/lib/auth/apple';
import { googleSignIn } from '@/lib/auth/google';
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
      promptAsync?: (options?: AuthSession.AuthRequestPromptOptions | undefined) => Promise<AuthSession.AuthSessionResult>,
      codeVerifier?: string
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
          await handleGoogleSignIn(redirectUri, promptAsync, codeVerifier);
          break;
        case 'Email':
          await handleEmailSignIn();
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
    } catch (error: unknown) {
      handleError(error instanceof Error ? error : new Error(String(error)), platform);
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
    promptAsync: (options?: AuthSession.AuthRequestPromptOptions | undefined) => Promise<AuthSession.AuthSessionResult>,
    codeVerifier?: string
  ) => {
    const result = await googleSignIn(redirectUri, promptAsync, codeVerifier);

    if (result.success && result.user) {
      console.log('Google Sign-In Success:', result.user);
      
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
    console.error(`${platform} Sign-In Error:`, getErrorMessage(error));
    
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