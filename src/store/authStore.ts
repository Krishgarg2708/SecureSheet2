import { create } from 'zustand';
import type { User } from '../types';
import { MOCK_CREDENTIALS } from '../data/mockUsers';

const STORAGE_KEY = 'securesheet.auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember: boolean) => { success: boolean; message?: string };
  loginAsRole: (role: User['role']) => void;
  logout: () => void;
  hydrate: () => void;
}

function persistUser(user: User | null, remember: boolean) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    return;
  }
  const payload = JSON.stringify(user);
  if (remember) {
    localStorage.setItem(STORAGE_KEY, payload);
  } else {
    sessionStorage.setItem(STORAGE_KEY, payload);
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email, password, remember) => {
    const match = MOCK_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.password === password
    );
    if (!match) {
      return { success: false, message: 'Invalid email or password. Try one of the demo accounts below.' };
    }
    persistUser(match.user, remember);
    set({ user: match.user, isAuthenticated: true });
    return { success: true };
  },
  loginAsRole: (role) => {
    const match = MOCK_CREDENTIALS.find((c) => c.user.role === role);
    if (!match) return;
    persistUser(match.user, true);
    set({ user: match.user, isAuthenticated: true });
  },
  logout: () => {
    persistUser(null, true);
    set({ user: null, isAuthenticated: false });
  },
  hydrate: () => {
    const raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const user = JSON.parse(raw) as User;
        set({ user, isAuthenticated: true });
      } catch {
        set({ user: null, isAuthenticated: false });
      }
    }
  },
}));
