import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '../config';

let configured = false;

export function ensureGoogleConfigured() {
  if (configured) return;
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true, // allows server-side flow if needed
    forceCodeForRefreshToken: true,
  });
  configured = true;
}

export async function signInWithGoogle(): Promise<{ idToken: string } | null> {
  ensureGoogleConfigured();
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const info = await GoogleSignin.signIn();
  let idToken = info?.idToken || null;

  // Some devices/Play Services versions don't return idToken on signIn()
  // Try to fetch tokens explicitly
  if (!idToken) {
    try {
      const tokens = await GoogleSignin.getTokens();
      idToken = tokens?.idToken || null;
      // eslint-disable-next-line no-undef
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        // eslint-disable-next-line no-console
        console.log('[GoogleLogin] fetched tokens after signIn()', Boolean(idToken));
      }
    } catch (e) {
      // eslint-disable-next-line no-undef
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        // eslint-disable-next-line no-console
        console.log('[GoogleLogin] getTokens() failed', e);
      }
    }
  }

  // Log idToken only in development to avoid leaking sensitive tokens in production logs
  if (idToken) {
    // eslint-disable-next-line no-undef
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      // eslint-disable-next-line no-console
      console.log('[GoogleLogin] idToken', idToken);
    }
  } else {
    // eslint-disable-next-line no-undef
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      // eslint-disable-next-line no-console
      console.log('[GoogleLogin] idToken still null after signIn/getTokens');
    }
  }

  return idToken ? { idToken } : null;
}
