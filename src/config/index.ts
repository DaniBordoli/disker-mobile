// Central configuration for API endpoints and timeouts

import Config from 'react-native-config';

export const BASE_URL = Config.BASE_URL || 'https://staging.supra.social';

export const DEFAULT_TIMEOUT_MS = 15000; // 15s

// Google OAuth Web Client ID (safe to keep in client). Do NOT store client_secret in the app.
export const GOOGLE_WEB_CLIENT_ID = '229284518222-25ogfouvjdr8me44gbjj0osuihko48qf.apps.googleusercontent.com';
