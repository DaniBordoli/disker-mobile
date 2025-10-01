declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL?: string;
  }
  const Config: NativeConfig;
  export default Config;
}
