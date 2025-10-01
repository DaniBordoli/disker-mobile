import { BASE_URL, DEFAULT_TIMEOUT_MS } from '../config';
import { useAuthStore } from '../store/auth';
import { ApiError } from '../types/api';

// Simple dev logger (exported for selective debug logs)
export function devLog(...args: any[]) {
  // eslint-disable-next-line no-undef
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

export const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export function authHeaders(): Record<string, string> {
  const token = useAuthStore.getState().accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function buildUrl(path: string) {
  return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export async function fetchWithTimeout(resource: string, options: RequestInit = {}, timeout = DEFAULT_TIMEOUT_MS): Promise<Response> {
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

export async function parseJson<T>(resp: Response): Promise<T> {
  const text = await resp.text();
  try {
    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (e) {
    throw new ApiError('Invalid JSON response', resp.status, text);
  }
}

// --- Proactive refresh scheduling ---
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

function base64UrlDecode(input: string): string | null {
  try {
    const b64 = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(input.length + (4 - (input.length % 4 || 4)), '=');
    // eslint-disable-next-line no-undef
    if (typeof __DEV__ !== 'undefined' && typeof atob === 'function') {
      // @ts-ignore
      return atob(b64);
    }
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

  const data = await parseJson<any>(resp);

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
      const fname = newUser.first_name ?? '';
      const lname = newUser.last_name ?? '';
      const computedName = `${String(fname || '').trim()} ${String(lname || '').trim()}`.trim();
      const name = (computedName || newUser.name || null) as string | null;
      useAuthStore.getState().setCurrentUser({ id: newUser.id, email: newUser.email, name, first_name: newUser.first_name ?? null, last_name: newUser.last_name ?? null, role: newUser.role ?? null });
    }
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

export async function fetchWithAuthRetry(resource: string, options: RequestInit = {}, timeout = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const withAuth = (opts: RequestInit): RequestInit => {
    const incomingHeaders = (opts.headers as Record<string, string>) || {};
    const { Authorization: _auth, ...rest } = incomingHeaders;
    return { ...opts, headers: { ...rest, ...authHeaders() } };
  };

  let resp = await fetchWithTimeout(resource, withAuth(options), timeout);
  if (resp.status === 401) {
    try {
      await refreshAccessToken();
      resp = await fetchWithTimeout(resource, withAuth(options), timeout);
    } catch {
      try {
        await useAuthStore.getState().clearSession();
      } catch {}
      return resp;
    }
  }
  return resp;
}
