// hooks/useSignIn.ts
import { appleSignIn } from '@/lib/utils/appleAuth';
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

type PlatformType = 'Apple' | 'Google' | 'Email';

interface UseSignInReturn {
  loading: boolean;
  signIn: (platform: PlatformType) => Promise<void>;
}

interface UseSignInOptions {
  onSuccess?: (userData: any) => void;
  onError?: (error: string) => void;
  showAlerts?: boolean;
}

export function useSignIn(options: UseSignInOptions = {}): UseSignInReturn {
  const [loading, setLoading] = useState(false);
  const { onSuccess, onError, showAlerts = true } = options;

  const signIn = useCallback(async (platform: PlatformType): Promise<void> => {
    if (loading) return;

    setLoading(true);
    
    try {
      switch (platform) {
        case 'Apple':
          await handleAppleSignIn();
          break;
        case 'Google':
          await handleGoogleSignIn();
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

  const handleGoogleSignIn = async () => {
    // Placeholder for Google sign-in
    console.log('Google sign-in clicked');
    // TODO: Implement Google sign-in
    throw new Error('Google sign-in not implemented yet');
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