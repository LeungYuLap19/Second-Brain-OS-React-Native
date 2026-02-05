import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router';
import { checkAppleSignIn } from '@/lib/utils/appleAuth';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const appleAuth = await checkAppleSignIn();
        setIsAuthenticated(appleAuth);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  return <Redirect href="/(tabs)/chatroom/" />;
}