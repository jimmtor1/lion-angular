import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ba.dcl.app',
  appName: 'lion',
  webDir: 'dist/lion',
  server: {
    androidScheme: 'https'
  }
};

export default config;
