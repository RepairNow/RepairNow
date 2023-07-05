import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.repairnow.app',
  appName: 'repair-now',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
