import { NativeModules } from 'react-native';

const { TikTokModule } = NativeModules as { TikTokModule?: { login?: (scopes: string[]) => Promise<{ authCode?: string; state?: string; codeVerifier?: string }> } };

export async function loginWithTikTokNative(scopes: string[]) {
  if (!TikTokModule?.login) throw new Error('tiktok_native_unavailable');
  return TikTokModule.login(scopes);
}
