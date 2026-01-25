import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css'
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'GoogleSansCode-Regular': require('@/assets/fonts/GoogleSansCode-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // Shows splash screen
  }

  return (
    // hide the navigation header in all pages of this app
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(auth)' />
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
