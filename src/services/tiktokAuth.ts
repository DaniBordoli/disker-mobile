import { authorize, AuthorizeResult } from 'react-native-app-auth';

const TIKTOK_AUTH_CONFIG = {
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.tiktok.com/auth/authorize/',
    tokenEndpoint: 'https://open.tiktokapis.com/v2/oauth/token/',
  },
  clientId: 'sbaw11v8bbfp5avb7d',
  redirectUrl: 'disker://oauthredirect/tiktok',
  // Requested scopes (Sandbox testers can consent even if not yet approved for production)
  scopes: ['user.info.basic', 'user.info.profile', 'user.info.stats', 'video.list'],
  usePKCE: true,
};

export async function loginWithTikTok(): Promise<AuthorizeResult> {
  // Throws on cancel or error
  return authorize(TIKTOK_AUTH_CONFIG as any);
}
