import Constants from 'expo-constants';

function getDevHost() {
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) return 'localhost';
  return hostUri.split(':')[0];
}

const HOST = getDevHost();

export const API_URL = `http://${HOST}:8000`;
export const WS_URL  = `ws://${HOST}:8000/ws`;
