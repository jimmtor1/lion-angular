import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ba.dcl.app',
  appName: 'dcl',
  webDir: 'dist/lion',
  bundledWebRuntime: false,
  server: {
    hostname: "dcl.ba",
    cleartext: true,
    androidScheme: 'https',
    url: "https://dcl.ba"
  },
  android: {
    "allowMixedContent": true
  }
};

export default config;
