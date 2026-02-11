import type { AppleAuthenticationFullName } from 'expo-apple-authentication';

// Authentication platform types
export type PlatformType = 'Apple' | 'Google' | 'Email';

export interface GoogleAuthResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
  accessToken?: string;
}

export interface AppleAuthResult {
  success: boolean;
  user?: {
    id: string;
    email?: string;
    fullName?: AppleAuthenticationFullName | undefined;
  };
  error?: string;
  token?: string | null;
}

// Hook return types
export interface UseSignInReturn {
  loading: boolean;
  signIn: (
    platform: PlatformType,
    redirectUri?: string,
    promptAsync?: (options?: any) => Promise<any>
  ) => Promise<void>;
}

export interface UseSignInOptions {
  onSuccess?: (userData: any) => void;
  onError?: (error: string) => void;
  showAlerts?: boolean;
}
