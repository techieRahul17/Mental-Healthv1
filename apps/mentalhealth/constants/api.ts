import { Platform } from 'react-native';

// Get your computer's IP address by running: ifconfig | grep "inet " | grep -v 127.0.0.1
// Or use these defaults for emulators
export const API_BASE = Platform.select({
  ios: 'http://localhost:3001',        // For iOS simulator
  android: 'http://10.0.2.2:3001',    // For Android emulator
  web: 'http://localhost:3001',        // For web
  default: 'http://localhost:3001',
});

// Alternative: Use your computer's actual IP (replace with your IP)
// export const API_BASE = 'http://192.168.1.100:3001';

console.log('🌐 API_BASE:', API_BASE);
