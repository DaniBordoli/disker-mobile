import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '../config';

let configured = false;

export function ensureGoogleConfigured() {
  if (configured) return;
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true, // allows server-side flow if needed
  });
  configured = true;
}

export async function signInWithGoogle(): Promise<{ idToken: string } | null> {
  ensureGoogleConfigured();
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const info = await GoogleSignin.signIn();
  const idToken = info?.idToken;
  return idToken ? { idToken } : null;
}
