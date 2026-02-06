import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css'
import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'GoogleSansCode-Regular': require('@/assets/fonts/GoogleSansCode-VariableFont_wght.ttf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Mark app as ready when fonts are loaded
    if (fontsLoaded || fontError) {
      setAppIsReady(true);
    }
  }, [fontsLoaded, fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide splash screen after the root view has laid out
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Don't render until the app is ready
  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="history-modal"
          options={{ presentation: 'modal', }}
        />
        <Stack.Screen 
          name='(auth)' 
          options={{ gestureEnabled: false, }}
        />
        <Stack.Screen 
          name='(tabs)' 
          options={{ gestureEnabled: false, }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
}