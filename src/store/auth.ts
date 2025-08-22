import { create, type StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthUser = {
  id: number;
  email: string;
  name?: string | null;
  role?: string | null;
};

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  currentUser: AuthUser | null;
  isHydrated: boolean;
  // actions
  setTokens: (tokens: { accessToken: string | null; refreshToken: string | null }) => Promise<void>;
  setCurrentUser: (user: AuthUser | null) => void;
  clearSession: () => Promise<void>;
  hydrate: () => Promise<void>;
}

const ACCESS_KEY = '@disker/auth/access_token';
const REFRESH_KEY = '@disker/auth/refresh_token';
const USER_KEY = '@disker/auth/user';

const creator: StateCreator<AuthState> = (set, get) => ({
  accessToken: null,
  refreshToken: null,
  currentUser: null,
  isHydrated: false,

  setTokens: async (tokens: { accessToken: string | null; refreshToken: string | null }) => {
    const { accessToken, refreshToken } = tokens;
    set({ accessToken, refreshToken });
    try {
      if (accessToken) {
        await AsyncStorage.setItem(ACCESS_KEY, accessToken);
      } else {
        await AsyncStorage.removeItem(ACCESS_KEY);
      }
      if (refreshToken) {
        await AsyncStorage.setItem(REFRESH_KEY, refreshToken);
      } else {
        await AsyncStorage.removeItem(REFRESH_KEY);
      }
    } catch (e) {
      // swallow storage errors
    }
  },

  setCurrentUser: (user: AuthUser | null) => set({ currentUser: user }),

  clearSession: async () => {
    set({ accessToken: null, refreshToken: null, currentUser: null });
    try {
      await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY, USER_KEY]);
    } catch (e) {
      // swallow
    }
  },

  hydrate: async () => {
    try {
      const [a, r, u] = await AsyncStorage.multiGet([ACCESS_KEY, REFRESH_KEY, USER_KEY]);
      const accessToken = a?.[1] || null;
      const refreshToken = r?.[1] || null;
      const userStr = u?.[1] || null;
      const currentUser: AuthUser | null = userStr ? JSON.parse(userStr) : null;
      set({ accessToken, refreshToken, currentUser, isHydrated: true });
    } catch (e) {
      set({ isHydrated: true });
    }
  },
});

export async function persistUser(user: AuthUser | null) {
  try {
    if (user) {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(USER_KEY);
    }
  } catch (e) {
    // ignore
  }
}

export const useAuthStore = create<AuthState>(creator);
