"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  startTransition,
  type ReactNode,
} from "react";

import en from "@/locales/en.json";
import id from "@/locales/id.json";

/* ─── Types ──────────────────────────────────────────────────────────────── */
export type Language = "en" | "id";

type Translations = typeof en; // shape anchor — both locales share the same shape

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

/* ─── Locale map ─────────────────────────────────────────────────────────── */
const locales: Record<Language, Translations> = { en, id };

const STORAGE_KEY = "akhdan_portfolio_lang";

/* ─── Dot-notation resolver ──────────────────────────────────────────────── */
function resolveDotPath(
  obj: Record<string, unknown>,
  path: string,
): string | undefined {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return typeof result === "string" ? result : undefined;
}

/* ─── Context ────────────────────────────────────────────────────────────── */
const I18nContext = createContext<I18nContextValue | null>(null);

/* ─── Provider ───────────────────────────────────────────────────────────── */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  /* Hydrate from localStorage once on the client */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    startTransition(() => {
      if (stored && (stored === "en" || stored === "id")) {
        setLanguageState(stored);
      }
      setMounted(true);
    });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* localStorage unavailable — silently ignore */
    }
    /* Update <html lang="…"> attribute for accessibility & SEO */
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, []);

  /**
   * Resolves a dot-notation key from the active locale, with optional
   * {placeholder} replacements.
   *
   * @example
   *   t("hero.title")                       // "Akhdan Ravi Andaman"
   *   t("footer.rights", { year: "2026" })  // "© 2026 Akhdan Ravi Andaman…"
   */
  const t = useCallback(
    (key: string, replacements?: Record<string, string | number>): string => {
      const dict = locales[language] as Record<string, unknown>;
      let value = resolveDotPath(dict, key);

      /* Fallback to English if key is missing in active locale */
      if (value === undefined) {
        value = resolveDotPath(locales["en"] as Record<string, unknown>, key);
      }

      /* Last-resort fallback: return the key itself so UI never breaks */
      if (value === undefined) return key;

      /* Apply {placeholder} substitutions */
      if (replacements) {
        return Object.entries(replacements).reduce(
          (str, [placeholder, val]) =>
            str.replaceAll(`{${placeholder}}`, String(val)),
          value,
        );
      }

      return value;
    },
    [language],
  );

  /*
   * During SSR / before hydration render with the default locale so the
   * server and initial client renders match, avoiding hydration mismatches.
   */
  const contextValue: I18nContextValue = {
    language: mounted ? language : "en",
    setLanguage,
    t,
  };

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
}

/* ─── Hook ───────────────────────────────────────────────────────────────── */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an <I18nProvider>.");
  }
  return ctx;
}
