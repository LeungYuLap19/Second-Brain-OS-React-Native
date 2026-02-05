import { getNewChatroomId } from '@/lib/utils/utilities';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

export default function ChatroomIndex() {
  useEffect(() => {
    (async () => {
      const id = await getNewChatroomId();
      console.log('Redirecting to chatroom:', id);
      router.replace(`/(tabs)/chatroom/${id}`);
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Creating new chatroom...</Text>
    </View>
  );
}
