// Types for API requests/responses

export interface ApiMeta {
  message?: string;
}

export interface ApiResponse<T> {
  meta?: ApiMeta;
  data?: T;
}

// Register Step 1
export interface RegisterUserStep1Request {
  user: {
    email: string;
  };
}

export interface SignupSteps {
  step_confirmation: boolean;
  step_password: boolean;
  step_set_names: boolean;
  step_personal_data: boolean;
}

export interface RegisterUserStep1User {
  id: number;
  email: string;
  name: string | null;
  role: 'talent' | 'brand' | string;
  confirmed_at: string | null;
  confirmation_sent_at: string | null;
  personal_data: unknown | null;
  created_at: string;
  updated_at: string;
  signup_steps: SignupSteps;
}

export interface RegisterUserStep1ResponseData {
  user: RegisterUserStep1User;
}

export type RegisterUserStep1Response = ApiResponse<RegisterUserStep1ResponseData>;

export class ApiError extends Error {
  status: number;
  body?: any;
  constructor(message: string, status: number, body?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

// Set Names (PATCH /api/v1/talents/users/:id)
export interface SetNamesRequest {
  set_names: {
    name: string;
    lastname: string;
  };
}

export type SetNamesResponse = ApiResponse<{
  user: RegisterUserStep1User;
}>;

// Set Password (PATCH /api/v1/talents/users/:id)
export interface SetPasswordRequest {
  set_password: {
    password: string;
  };
}

export type SetPasswordResponse = ApiResponse<{
  user: RegisterUserStep1User;
}>;

// Confirm Email (GET /api/v1/talents/users/confirmation?confirmation_token=...)
export type ConfirmEmailResponse = ApiResponse<{
  access_token?: string;
  refresh_token?: string;
  user: RegisterUserStep1User;
}>;

// Set Personal Data (PATCH /api/v1/talents/users/:id)
export interface SetPersonalDataRequest {
  set_personal_data: {
    country: string;
    city_uid: number;
    birthdate: string; // format DD-MM-YYYY
    gender: 'male' | 'female';
  };
}

export type SetPersonalDataResponse = ApiResponse<{
  user: RegisterUserStep1User;
}>;

// Login (POST /api/v1/talents/sessions)
export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<{
  access_token: string;
  refresh_token: string;
  user: RegisterUserStep1User;
}>;

// ---- Current User (GET /api/v1/talents/users) ----
export interface PersonalData {
  nationality?: string | null;
  birthday?: string | null; // YYYY-MM-DD
  gender?: 'male' | 'female' | string | null;
  location_id?: number | null;
  postal_code?: string | null;
}

export interface CurrentUser {
  id: number;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  name?: string | null; // optional convenience
  role: 'talent' | 'brand' | string;
  personal_data?: PersonalData | null;
  signup_steps: SignupSteps;
}

export type CurrentUserResponse = ApiResponse<{
  user: CurrentUser;
}>;
