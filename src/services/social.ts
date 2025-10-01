import type { ApiResponse } from '../types/api';
import { ApiError } from '../types/api';
import { useAuthStore } from '../store/auth';
import {
  devLog,
  defaultHeaders,
  buildUrl,
  parseJson,
  fetchWithAuthRetry,
} from './apiClient';

export type LinkedAccount = {
  id: string | number;
  platform: 'tiktok' | 'instagram' | 'youtube' | string;
  username?: string | null;
};

// Store social tokens from native SDK into backend
export async function storeTikTokTokens(tiktokPayload: Record<string, any>): Promise<{ stored: boolean }>{
  const url = buildUrl('/api/v1/talents/store_tokens');
  const body = { tiktok: tiktokPayload };
  devLog('[storeTikTokTokens] request', { url, body });
  const resp = await fetchWithAuthRetry(url, {
    method: 'POST',
    headers: { ...defaultHeaders },
    body: JSON.stringify(body),
  });
  const data = await parseJson<ApiResponse<any>>(resp);
  devLog('[storeTikTokTokens] raw response', data);
  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }
  return { stored: true };
}

// Fetch linked social accounts for current user
export async function getLinkedAccounts(): Promise<LinkedAccount[]> {
  const userId = useAuthStore.getState().currentUser?.id;
  if (!userId) {
    throw new ApiError('No current user available to fetch accounts', 401);
  }
  const url = buildUrl(`/api/v1/talents/users/${userId}/accounts`);
  devLog('[getLinkedAccounts] request', { url });
  const resp = await fetchWithAuthRetry(url, {
    method: 'GET',
    headers: { ...defaultHeaders },
  });

  const data = await parseJson<ApiResponse<any>>(resp);
  devLog('[getLinkedAccounts] raw response', data);
  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }

  const list: any[] = (data as any)?.data || (Array.isArray(data) ? (data as any) : []);
  const normalized = (Array.isArray(list) ? list : []).map((it) => ({
    id: it.id ?? it.account_id ?? String(Math.random()),
    platform: it.platform ?? it.provider ?? 'tiktok',
    username: it.username ?? it.handle ?? null,
  })) as LinkedAccount[];
  devLog('[getLinkedAccounts] normalized', normalized);
  return normalized;
}
