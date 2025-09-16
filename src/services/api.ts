import { BASE_URL, DEFAULT_TIMEOUT_MS } from '../config';
import { useAuthStore, persistUser } from '../store/auth';
import type {
  ApiResponse,
  RegisterUserStep1Request,
  RegisterUserStep1Response,
  SetNamesRequest,
  SetNamesResponse,
  ConfirmEmailResponse,
  SetPasswordRequest,
  SetPasswordResponse,
  SetPersonalDataRequest,
  SetPersonalDataResponse,
  LoginRequest,
  LoginResponse,
} from '../types/api';
import { ApiError } from '../types/api';

// Simple dev logger
function devLog(...args: any[]) {
  // Only log in development to avoid noisy production logs
  // __DEV__ is defined by React Native runtime
  // eslint-disable-next-line no-undef
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

// Exchange TikTok auth code (from native SDK) and link account to current user
export async function exchangeTikTokAuthCode(
  authCode: string,
  codeVerifier?: string,
  scopes?: string[]
): Promise<{ linked: boolean }>{
  // Backend expects GET with query params: auth_code, state, scope
  // Avoid URLSearchParams in RN; build query manually
  const qp: string[] = [];
  qp.push(`code=${encodeURIComponent(authCode)}`);
  if (codeVerifier) qp.push(`state=${encodeURIComponent(codeVerifier)}`);
  if (scopes && scopes.length > 0) qp.push(`scope=${encodeURIComponent(scopes.join(','))}`);
  const url = buildUrl(`/api/v1/talents/tiktok_oauth/callback?${qp.join('&')}`);
  const resp = await fetchWithAuthRetry(url, {
    method: 'GET',
    headers: { ...defaultHeaders },
  });

  const data = await parseJson<ApiResponse<any>>(resp);
  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }
  return { linked: true };
}

async function fetchWithTimeout(resource: string, options: RequestInit = {}, timeout = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    devLog('[API] request', { url: resource, method: (options as any)?.method || 'GET', headers: (options as any)?.headers, body: (options as any)?.body });
    const resp = await fetch(resource, { ...options, signal: controller.signal });
    devLog('[API] response status', resp.status, resource);
    return resp;
  } finally {
    clearTimeout(id);
  }
}

async function parseJson<T>(resp: Response): Promise<T> {
  const text = await resp.text();
  try {
    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (e) {
    throw new ApiError('Invalid JSON response', resp.status, text);
  }
}

function buildUrl(path: string) {
  return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

function authHeaders(): Record<string, string> {
  const token = useAuthStore.getState().accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// --- Proactive refresh scheduling ---
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

function base64UrlDecode(input: string): string | null {
  try {
    const b64 = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(input.length + (4 - (input.length % 4 || 4)), '=');
    if (typeof globalThis.atob === 'function') {
      // JWT payload is ASCII-safe JSON; atob is sufficient in RN
      return globalThis.atob(b64);
    }
    // Fallback: try Buffer if available
    // @ts-ignore
    if (typeof Buffer !== 'undefined') {
      // @ts-ignore
      return Buffer.from(b64, 'base64').toString('utf-8');
    }
  } catch {}
  return null;
}

function getJwtExpSeconds(token: string | null | undefined): number | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const payloadStr = base64UrlDecode(parts[1]);
  if (!payloadStr) return null;
  try {
    const payload = JSON.parse(payloadStr);
    const exp = typeof payload?.exp === 'number' ? payload.exp : null;
    return exp ?? null;
  } catch {
    return null;
  }
}

export function scheduleProactiveRefresh(aheadSeconds = 60) {
  try {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
    const access = useAuthStore.getState().accessToken;
    const exp = getJwtExpSeconds(access);
    if (!exp) return;
    const nowSec = Math.floor(Date.now() / 1000);
    const delayMs = Math.max(0, (exp - aheadSeconds - nowSec) * 1000);
    if (delayMs === 0) return;
    refreshTimer = setTimeout(() => {
      refreshAccessToken().catch(() => {
        // swallow; refreshAccessToken handles clearSession
      });
    }, delayMs);
  } catch {}
}

// Refresh access token using the stored refresh token
export async function refreshAccessToken(): Promise<string> {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) {
    try {
      await useAuthStore.getState().clearSession();
    } catch {}
    throw new ApiError('No refresh token available', 401);
  }

  const url = buildUrl('/api/v1/talents/sessions/refresh');
  const resp = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { ...defaultHeaders },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await parseJson<ApiResponse<any>>(resp);

  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Refresh failed with status ${resp.status}`;
    try {
      await useAuthStore.getState().clearSession();
    } catch {}
    throw new ApiError(message, resp.status, data);
  }

  const newAccess: string | undefined = (data as any)?.data?.access_token;
  const newRefresh: string | undefined = (data as any)?.data?.refresh_token;
  const newUser = (data as any)?.data?.user;

  try {
    await useAuthStore.getState().setTokens({ accessToken: newAccess || null, refreshToken: newRefresh || null });
    if (newUser && typeof newUser === 'object') {
      // Optionally update user in store if backend returns it
      useAuthStore.getState().setCurrentUser({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name ?? null,
        role: newUser.role ?? null,
      });
    }
    // schedule next proactive refresh after updating tokens
    scheduleProactiveRefresh();
  } catch {}

  if (!newAccess) {
    try {
      await useAuthStore.getState().clearSession();
    } catch {}
    throw new ApiError('Refresh did not return access token', 500, data);
  }
  return newAccess;
}

// Wrapper that retries once on 401 by refreshing the token
async function fetchWithAuthRetry(resource: string, options: RequestInit = {}, timeout = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const withAuth = (opts: RequestInit): RequestInit => {
    const incomingHeaders = (opts.headers as Record<string, string>) || {};
    // Remove any stale Authorization provided by caller
    const { Authorization: _auth, ...rest } = incomingHeaders;
    return { ...opts, headers: { ...rest, ...authHeaders() } };
  };

  let resp = await fetchWithTimeout(resource, withAuth(options), timeout);
  if (resp.status === 401) {
    try {
      await refreshAccessToken();
      resp = await fetchWithTimeout(resource, withAuth(options), timeout);
    } catch {
      // return original 401 response if refresh fails
      try {
        await useAuthStore.getState().clearSession();
      } catch {}
      return resp;
    }
  }
  return resp;
}

export async function registerUserStep1(payload: RegisterUserStep1Request): Promise<RegisterUserStep1Response> {
  const url = buildUrl('/api/v1/talents/users');
  const resp = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { ...defaultHeaders, ...authHeaders() },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<ApiResponse<any>>(resp);

  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }

  return data as RegisterUserStep1Response;
}

// Login with email/password
export async function loginSession(payload: LoginRequest): Promise<LoginResponse> {
  const url = buildUrl('/api/v1/talents/sessions');
  const resp = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { ...defaultHeaders },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<ApiResponse<any>>(resp);
  devLog('[loginSession] parsed', data);

  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    devLog('[loginSession] error', message);
    throw new ApiError(message, resp.status, data);
  }

  // Persist tokens and user
  try {
    const access = (data as any)?.data?.access_token as string | undefined;
    const refresh = (data as any)?.data?.refresh_token as string | undefined;
    const user = (data as any)?.data?.user as any | undefined;
    if (access || refresh) {
      await useAuthStore.getState().setTokens({ accessToken: access || null, refreshToken: refresh || null });
    }
    if (user && typeof user === 'object') {
      useAuthStore.getState().setCurrentUser({
        id: user.id,
        email: user.email,
        name: user.name ?? null,
        role: user.role ?? null,
      });
      // Persist user to storage
      try {
        await persistUser({ id: user.id, email: user.email, name: user.name ?? null, role: user.role ?? null });
      } catch {}
    }
    // Schedule proactive refresh
    scheduleProactiveRefresh();
  } catch {}

  return data as LoginResponse;
}

// Login with Google id_token
export async function loginWithGoogleSession(idToken: string): Promise<LoginResponse> {
  const url = buildUrl('/api/v1/talents/sessions/google');
  const resp = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { ...defaultHeaders },
    body: JSON.stringify({ id_token: idToken }),
  });

  const data = await parseJson<ApiResponse<any>>(resp);
  devLog('[loginWithGoogleSession] parsed', data);

  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    devLog('[loginWithGoogleSession] error', message);
    throw new ApiError(message, resp.status, data);
  }

  // Persist tokens and user (same as loginSession)
  try {
    const access = (data as any)?.data?.access_token as string | undefined;
    const refresh = (data as any)?.data?.refresh_token as string | undefined;
    const user = (data as any)?.data?.user as any | undefined;
    if (access || refresh) {
      await useAuthStore.getState().setTokens({ accessToken: access || null, refreshToken: refresh || null });
    }
    if (user && typeof user === 'object') {
      useAuthStore.getState().setCurrentUser({
        id: user.id,
        email: user.email,
        name: user.name ?? null,
        role: user.role ?? null,
      });
      try {
        await persistUser({ id: user.id, email: user.email, name: user.name ?? null, role: user.role ?? null });
      } catch {}
    }
    scheduleProactiveRefresh();
  } catch {}

  return data as LoginResponse;
}

export async function setUserNamesStep4(
  userId: string | number,
  payload: SetNamesRequest,
): Promise<SetNamesResponse> {
  const url = buildUrl(`/api/v1/talents/users/${userId}`);
  const resp = await fetchWithAuthRetry(url, {
    method: 'PATCH',
    headers: { ...defaultHeaders },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<ApiResponse<any>>(resp);
  devLog('[setUserNamesStep4] parsed', data);

  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    devLog('[setUserNamesStep4] error', message);
    throw new ApiError(message, resp.status, data);
  }

  return data as SetNamesResponse;
}

export async function confirmEmailStep2(confirmationToken: string): Promise<ConfirmEmailResponse> {
  const url = buildUrl(`/api/v1/talents/users/confirmation?confirmation_token=${encodeURIComponent(confirmationToken)}`);
  const resp = await fetchWithTimeout(url, {
    method: 'GET',
    headers: { ...defaultHeaders, ...authHeaders() },
  });

  const data = await parseJson<ApiResponse<any>>(resp);

  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }

  return data as ConfirmEmailResponse;
}

export async function setUserPasswordStep3(
  userId: string | number,
  payload: SetPasswordRequest,
): Promise<SetPasswordResponse> {
  const url = buildUrl(`/api/v1/talents/users/${userId}`);
  const resp = await fetchWithAuthRetry(url, {
    method: 'PATCH',
    headers: { ...defaultHeaders },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<ApiResponse<any>>(resp);

  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }

  return data as SetPasswordResponse;
}

export async function setPersonalDataStep5(
  userId: string | number,
  payload: SetPersonalDataRequest,
): Promise<SetPersonalDataResponse> {
  const url = buildUrl(`/api/v1/talents/users/${userId}`);
  const resp = await fetchWithAuthRetry(url, {
    method: 'PATCH',
    headers: { ...defaultHeaders },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<ApiResponse<any>>(resp);

  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }

  return data as SetPersonalDataResponse;
}

// ---- TikTok linking ----
export type LinkedAccount = {
  id: string | number;
  platform: 'tiktok' | 'instagram' | 'youtube' | string;
  username?: string | null;
};

type StartTikTokConnectResponse = { auth_url: string };

// Initiate TikTok connect flow. Adjust path to your backend if different.
export async function startTikTokConnect(): Promise<StartTikTokConnectResponse> {
  const url = buildUrl('/api/v1/social/tiktok/connect');
  const resp = await fetchWithAuthRetry(url, {
    method: 'POST',
    headers: { ...defaultHeaders },
    body: JSON.stringify({}),
  });

  const data = await parseJson<ApiResponse<any>>(resp);
  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }

  const auth_url: string | undefined = (data as any)?.data?.auth_url || (data as any)?.auth_url;
  if (!auth_url) {
    throw new ApiError('Backend did not return auth_url', 500, data);
  }
  return { auth_url };
}

// Fetch linked social accounts. Adjust path/shape to your backend.
export async function getLinkedAccounts(): Promise<LinkedAccount[]> {
  const url = buildUrl('/api/v1/social/accounts');
  const resp = await fetchWithAuthRetry(url, {
    method: 'GET',
    headers: { ...defaultHeaders },
  });

  const data = await parseJson<ApiResponse<any>>(resp);
  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }

  const list: any[] = (data as any)?.data || (Array.isArray(data) ? (data as any) : []);
  // Normalize minimal fields
  return (Array.isArray(list) ? list : []).map((it) => ({
    id: it.id ?? it.account_id ?? String(Math.random()),
    platform: it.platform ?? it.provider ?? 'tiktok',
    username: it.username ?? it.handle ?? null,
  })) as LinkedAccount[];
}
