import { useAuthStore } from '../store/auth';
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
  CurrentUserResponse,
} from '../types/api';
import { ApiError } from '../types/api';
import { buildUrl, defaultHeaders, authHeaders, fetchWithTimeout, fetchWithAuthRetry, parseJson } from './apiClient';

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

  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }

  return data as SetNamesResponse;
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

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const url = buildUrl('/api/v1/talents/users');
  const resp = await fetchWithAuthRetry(url, {
    method: 'GET',
    headers: { ...defaultHeaders },
  });

  const data = await parseJson<ApiResponse<any>>(resp);
  if (!resp.ok) {
    const message = (data as any)?.meta?.message || `Request failed with status ${resp.status}`;
    throw new ApiError(message, resp.status, data);
  }

  try {
    const rawUser = (data as any)?.data?.user;
    if (rawUser && typeof rawUser === 'object') {
      const fname = rawUser.first_name ?? '';
      const lname = rawUser.last_name ?? '';
      const name = `${String(fname || '').trim()} ${String(lname || '').trim()}`.trim() || null;
      useAuthStore.getState().setCurrentUser({
        id: rawUser.id,
        email: rawUser.email,
        name,
        first_name: rawUser.first_name ?? null,
        last_name: rawUser.last_name ?? null,
        role: rawUser.role ?? null,
      });
      try {
        useAuthStore.getState().setLastFetchedUserAt(Date.now());
      } catch {}
    }
  } catch {}

  return data as CurrentUserResponse;
}
