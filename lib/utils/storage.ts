import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID_KEY = 'clientid';
const CHATROOM_ID_KEY = 'chatroomid';

export async function getClientId() {
  let id = await AsyncStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
    await AsyncStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}

export async function getChatroomId() {
  let id = await AsyncStorage.getItem(CHATROOM_ID_KEY);
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
    await AsyncStorage.setItem(CHATROOM_ID_KEY, id);
  }
  return id;
}

export async function getNewChatroomId() {
  await AsyncStorage.removeItem(CHATROOM_ID_KEY);
  const id = await getChatroomId();
  return id;
}

export async function setChatroomId(id: string) {
  await AsyncStorage.setItem(CHATROOM_ID_KEY, id);
}
