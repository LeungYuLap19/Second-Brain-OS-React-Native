import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();

export type GoogleAuthResult = {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
  accessToken?: string;
};

// Store keys
const GOOGLE_AUTH_KEYS = {
  USER_ID: 'google_user_id',
  USER_EMAIL: 'google_user_email',
  ACCESS_TOKEN: 'google_access_token',
  REFRESH_TOKEN: 'google_refresh_token',
} as const;

// Discovery document for Google OAuth endpoints
export const googleDiscovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export const clientIds = {
  ios: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  // android:
};

/**
 * Handle Google Sign-In using AuthSession
 * @returns GoogleAuthResult
 */
export async function googleSignIn(
  redirectUri: string,
  promptAsync: (options?: AuthSession.AuthRequestPromptOptions | undefined) => Promise<AuthSession.AuthSessionResult>
): Promise<GoogleAuthResult> {
  try {
    if (!clientIds.ios) {
      return {
        success: false,
        error: 'Google Client ID for iOS is not configured. Please check your environment variables.',
      };
    }

    const authResponse = await promptAsync();

    if (authResponse.type === 'success') {
      const { code } = authResponse.params;

      const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
          clientId: clientIds.ios,
          redirectUri,
          code,
          extraParams: {
            grant_type: 'authorization_code',
          },
        },
        googleDiscovery
      );

      if (tokenResponse.accessToken) {
        await SecureStore.setItemAsync(
          GOOGLE_AUTH_KEYS.ACCESS_TOKEN,
          tokenResponse.accessToken,
          { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
        );
      }

      if (tokenResponse.refreshToken) {
        await SecureStore.setItemAsync(
          GOOGLE_AUTH_KEYS.REFRESH_TOKEN,
          tokenResponse.refreshToken,
          { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
        );
      }

      const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`
        }
      });

      const userData = await userInfo.json();

      if (userData.id) {
        await SecureStore.setItemAsync(
          GOOGLE_AUTH_KEYS.USER_ID,
          userData.id,
          { keychainAccessible: SecureStore.WHEN_UNLOCKED }
        );
      }
      
      if (userData.email) {
        await SecureStore.setItemAsync(
          GOOGLE_AUTH_KEYS.USER_EMAIL,
          userData.email,
          { keychainAccessible: SecureStore.WHEN_UNLOCKED }
        );
      }

      return {
        success: true,
        user: {
          id: userData.id,
          email: userData.email,
          name: userData.name
        },
        accessToken: tokenResponse.accessToken
      };
    }

    else if (authResponse.type === 'cancel') {
      return {
        success: false,
        error: 'Sign in cancelled by user'
      };
    }

    return {
      success: false,
      error: 'Authentication failed'
    };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    return {
      success: false,
      error: error.message || 'Google Sign-In failed',
    };
  }
}

/**
 * Check if user is signed in with Google
 * @returns boolean
 */
export async function checkGoogleSignIn(): Promise<boolean> {
  try {
    const token = await SecureStore.getItemAsync(GOOGLE_AUTH_KEYS.ACCESS_TOKEN);
    return !!token;
  } catch (error: any) {
    console.error('Google signin check error:', error);
    return false;
  }
}

/**
 * Refresh Google access token
 * @returns string | null
 */
export async function refreshGoogleToken(): Promise<string | null> {
  try {
    const refreshToken = await SecureStore.getItemAsync(GOOGLE_AUTH_KEYS.REFRESH_TOKEN);

    if (!refreshToken || !clientIds.ios) {
      console.error('Refresh token or client id missing error.');
      return null;
    }

    const response = await fetch(googleDiscovery.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientIds.ios,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    });

    const data = await response.json();

    if (data.access_token) {
      await SecureStore.setItemAsync(
        GOOGLE_AUTH_KEYS.ACCESS_TOKEN,
        data.access_token,
        { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
      );
      return data.access_token;
    }

    return null;
  } catch (error: any) {
    console.error('Google token refresh error:', error);
    return null;
  }
}

/**
 * Sign out from Google
 * Remove access token from Google 
 */
export async function googleSignOut(): Promise<void> {
  try {
    const accessToken = await SecureStore.getItemAsync(GOOGLE_AUTH_KEYS.ACCESS_TOKEN);

    if (accessToken) {
      await fetch(googleDiscovery.revocationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          token: accessToken,
        }),
      });
    }

    await Promise.all([
      SecureStore.deleteItemAsync(GOOGLE_AUTH_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(GOOGLE_AUTH_KEYS.REFRESH_TOKEN),
      SecureStore.deleteItemAsync(GOOGLE_AUTH_KEYS.USER_ID),
      SecureStore.deleteItemAsync(GOOGLE_AUTH_KEYS.USER_EMAIL),
    ]);

    console.log('Google Sign-Out successful');
  } catch (error: any) {
    console.error('Google Sign-Out Error:', error);
    throw error;
  }
}