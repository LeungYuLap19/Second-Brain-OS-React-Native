import type { AppleAuthResult } from '@/types';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Store keys
const APPLE_AUTH_KEYS = {
  USER_ID: 'apple_user_id',
  USER_EMAIL: 'apple_user_email',
  USER_FULLNAME: 'apple_user_fullname',
  IDENTITY_TOKEN: 'apple_identity_token',
} as const;

/**
 * Handle Apple Sign-In
 * Returns user info and authorization token
 */
export async function appleSignIn(): Promise<AppleAuthResult> {
  const isAvailable = await AppleAuthentication.isAvailableAsync();
  if (Platform.OS !== 'ios' || !isAvailable) {
    return {
      success: false,
      error: 'Apple Sign-In is not available on this device',
    };
  }

  try {
    // Perform Apple Sign-In
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    // Store user ID securely
    if (credential.user) {
      await SecureStore.setItemAsync(
        APPLE_AUTH_KEYS.USER_ID, 
        credential.user, 
        { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
      );
    }

    // Store identity token if present
    if (credential.identityToken) {
      await SecureStore.setItemAsync(
        APPLE_AUTH_KEYS.IDENTITY_TOKEN, 
        credential.identityToken,
        { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
      );
    }

    if (credential.email) {
      await SecureStore.setItemAsync(
        APPLE_AUTH_KEYS.USER_EMAIL, 
        credential.email,
        { keychainAccessible: SecureStore.WHEN_UNLOCKED }
      );
    }

    if (credential.fullName) {
      await SecureStore.setItemAsync(
        APPLE_AUTH_KEYS.USER_FULLNAME, 
        JSON.stringify(credential.fullName),
        { keychainAccessible: SecureStore.WHEN_UNLOCKED }
      );
    }

    return {
      success: true,
      user: {
        id: credential.user,
        email: credential.email || undefined,
        fullName: credential.fullName || undefined,
      },
      token: credential.identityToken,
    };

  } catch (error: any) {
    if (error.code === 'ERR_CANCELED') {
      return {
        success: false,
        error: 'Sign in cancelled by user',
      };
    }

    console.error('Apple Sign-In Error:', error);
    return {
      success: false,
      error: error.message || 'Apple Sign-In failed',
    };
  }
}

/**
 * Check if user is already signed in with Apple
 * Actually, for Apple Sign-In, we should check if we have stored credentials
 * But note: Apple tokens are short-lived (10-30 mins)
 */
export async function checkAppleSignIn(): Promise<boolean> {
  if (Platform.OS !== 'ios') return false;
  
  try {
    const userId = await SecureStore.getItemAsync(APPLE_AUTH_KEYS.USER_ID);
    return !!userId;
  } catch {
    return false;
  }
}

/**
 * Get stored Apple user data
 */
export async function getAppleUserData(): Promise<{
  id?: string;
  email?: string;
  fullName?: AppleAuthentication.AppleAuthenticationFullName;
} | null> {
  try {
    const id = await SecureStore.getItemAsync(APPLE_AUTH_KEYS.USER_ID);
    const email = await SecureStore.getItemAsync(APPLE_AUTH_KEYS.USER_EMAIL);
    const fullNameStr = await SecureStore.getItemAsync(APPLE_AUTH_KEYS.USER_FULLNAME);
    
    if (!id) return null;
    
    return {
      id: id || undefined,
      email: email || undefined,
      fullName: fullNameStr ? JSON.parse(fullNameStr) : undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Sign out from Apple
 */
export async function appleSignOut(): Promise<void> {
  try {
    // Remove all stored Apple auth data
    await Promise.all([
      SecureStore.deleteItemAsync(APPLE_AUTH_KEYS.USER_ID),
      SecureStore.deleteItemAsync(APPLE_AUTH_KEYS.USER_EMAIL),
      SecureStore.deleteItemAsync(APPLE_AUTH_KEYS.USER_FULLNAME),
      SecureStore.deleteItemAsync(APPLE_AUTH_KEYS.IDENTITY_TOKEN),
    ]);
    
    console.log('Apple Sign-Out successful - All credentials removed');
  } catch (error) {
    console.error('Apple Sign-Out Error:', error);
    throw error;
  }
}

/**
 * Refresh Apple credentials if needed
 * Note: Apple tokens expire quickly, this is just for checking
 */
export async function refreshAppleCredentials(): Promise<boolean> {
  try {
    // Check if we have credentials
    const userId = await SecureStore.getItemAsync(APPLE_AUTH_KEYS.USER_ID);
    
    if (!userId) {
      return false;
    }
    
    // Optionally: Verify with your backend that token is still valid
    // Or attempt to get fresh credentials
    
    return true;
  } catch {
    return false;
  }
}