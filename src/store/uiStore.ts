import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';
export type GridDensity = 'comfortable' | 'compact';
export type Language = 'English' | 'Hindi' | 'Spanish' | 'French';

const STORAGE_KEY = 'securesheet.preferences';

interface Preferences {
  theme: ThemeMode;
  compactMode: boolean;
  gridDensity: GridDensity;
  language: Language;
  notificationsEnabled: boolean;
  sidebarCollapsed: boolean;
}

interface UIState extends Preferences {
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setCompactMode: (v: boolean) => void;
  setGridDensity: (v: GridDensity) => void;
  setLanguage: (v: Language) => void;
  setNotificationsEnabled: (v: boolean) => void;
  toggleSidebar: () => void;
  hydrate: () => void;
}

function loadPreferences(): Preferences {
  const defaults: Preferences = {
    theme: 'dark',
    compactMode: false,
    gridDensity: 'comfortable',
    language: 'English',
    notificationsEnabled: true,
    sidebarCollapsed: false,
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaults;
}

function savePreferences(prefs: Preferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

function applyThemeClass(theme: ThemeMode) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export const useUIStore = create<UIState>((set, get) => ({
  ...loadPreferences(),
  setTheme: (theme) => {
    applyThemeClass(theme);
    set({ theme });
    savePreferences({ ...get(), theme });
  },
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    applyThemeClass(next);
    set({ theme: next });
    savePreferences({ ...get(), theme: next });
  },
  setCompactMode: (v) => {
    set({ compactMode: v });
    savePreferences({ ...get(), compactMode: v });
  },
  setGridDensity: (v) => {
    set({ gridDensity: v });
    savePreferences({ ...get(), gridDensity: v });
  },
  setLanguage: (v) => {
    set({ language: v });
    savePreferences({ ...get(), language: v });
  },
  setNotificationsEnabled: (v) => {
    set({ notificationsEnabled: v });
    savePreferences({ ...get(), notificationsEnabled: v });
  },
  toggleSidebar: () => {
    const next = !get().sidebarCollapsed;
    set({ sidebarCollapsed: next });
    savePreferences({ ...get(), sidebarCollapsed: next });
  },
  hydrate: () => {
    const prefs = loadPreferences();
    applyThemeClass(prefs.theme);
    set(prefs);
  },
}));
