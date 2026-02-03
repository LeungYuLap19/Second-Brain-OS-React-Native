// lib/utils/url-helper-sync.ts
import { Platform } from 'react-native';
import Constants from 'expo-constants';

class URLHelperSync {
  private static serverIp = '192.168.1.240';
  private static port = 8000;

  /**
   * Check if running in iOS Simulator (sync version)
   * Note: This is less reliable but works for most cases
   */
  private static isIOSSimulator(): boolean {
    // Method 1: Check if app is running in Expo Go (which means physical device)
    const isExpoGo = Constants.appOwnership === 'expo';
    
    // Method 2: Check platform and some heuristics
    if (Platform.OS === 'ios' && __DEV__) {
      // If it's iOS in dev mode but NOT Expo Go, it's likely simulator
      // This is a heuristic - might need adjustment
      return !isExpoGo;
    }
    
    return false;
  }

  /**
   * Get base URL (sync version)
   */
  static getBaseUrl(): string {
    if (this.isIOSSimulator()) {
      console.log('🔧 iOS Simulator detected, using localhost');
      return `http://localhost:${this.port}`;
    } else {
      console.log('📱 Physical device or Android, using server IP');
      return `http://${this.serverIp}:${this.port}`;
    }
  }

  /**
   * Get WebSocket URL (sync)
   */
  static getWebSocketUrl(clientId: string, chatroomId: string): string {
    const baseUrl = this.getBaseUrl();
    const wsBase = baseUrl.replace('http://', 'ws://').replace('https://', 'wss://');
    return `${wsBase}/ws/${clientId}/${chatroomId}`;
  }

  /**
   * Build API URL (sync)
   */
  static buildApiUrl(endpoint: string): string {
    const baseUrl = this.getBaseUrl();
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${formattedEndpoint}`;
  }

  /**
   * Fetch helper (sync URL building)
   */
  static fetchFromApi(endpoint: string, options?: RequestInit): Promise<Response> {
    const url = this.buildApiUrl(endpoint);
    console.log(`📡 Fetching from: ${url}`);
    return fetch(url, options);
  }
}

export default URLHelperSync;