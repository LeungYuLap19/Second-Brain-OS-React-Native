// Authentication platform types
export type PlatformType = 'Apple' | 'Google' | 'Email';

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
