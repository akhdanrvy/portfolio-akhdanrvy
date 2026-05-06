'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  startTransition,
  type ReactNode,
} from 'react';

/* ─── Types ──────────────────────────────────────────────────────────────── */
export type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/* ─── Constants ──────────────────────────────────────────────────────────── */
const STORAGE_KEY = 'portfolio-theme';

/* ─── Context ────────────────────────────────────────────────────────────── */
const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ─── Provider ───────────────────────────────────────────────────────────── */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  /* Hydrate from localStorage and system preference once on the client */
  useEffect(() => {
    startTransition(() => {
      try {
        // First, check localStorage
        const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;

        if (stored && (stored === 'dark' || stored === 'light')) {
          setThemeState(stored);
        } else {
          // If not stored, check system preference
          const prefersDark = !window.matchMedia('(prefers-color-scheme: light)').matches;
          setThemeState(prefersDark ? 'dark' : 'light');
        }
      } catch {
        /* localStorage or matchMedia unavailable — use default */
      }

      setMounted(true);
    });
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);

    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      /* localStorage unavailable — silently ignore */
    }

    /* Update data-theme attribute on <html> for CSS variables to switch */
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  /*
   * During SSR / before hydration render with the default theme so the
   * server and initial client renders match, avoiding hydration mismatches.
   */
  const contextValue: ThemeContextValue = {
    theme: mounted ? theme : 'dark',
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
}

/* ─── Hook ───────────────────────────────────────────────────────────────── */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>.');
  }
  return ctx;
}
