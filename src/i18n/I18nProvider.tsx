"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { productMessages, categoryMessages } from "@/i18n/productMessages";

type Vars = Record<string, string | number>;

interface I18nCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** UI string by dotted key, with {var} interpolation. Falls back to English, then the key. */
  t: (key: string, vars?: Vars) => string;
  /** Localized product field (es/pt only); undefined → caller uses the English source. */
  tp: <T = string>(slug: string, field: string) => T | undefined;
  /** Localized category label/blurb (es/pt only); undefined → caller uses the English source. */
  tc: (category: string, field: "label" | "blurb") => string | undefined;
}

const I18nContext = createContext<I18nCtx | null>(null);

function resolve(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string, unknown>)[k]), obj);
}

function interpolate(str: string, vars?: Vars): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k: string) =>
    k in vars ? String(vars[k]) : `{${k}}`,
  );
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Apply the stored choice after hydration.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_COOKIE);
      if (isLocale(stored)) setLocaleState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LOCALE_COOKIE, l);
    } catch {
      /* ignore */
    }
    document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;samesite=lax`;
  }, []);

  const t = useCallback(
    (key: string, vars?: Vars) => {
      const val =
        resolve(messages[locale], key) ?? resolve(messages.en, key) ?? key;
      return typeof val === "string" ? interpolate(val, vars) : String(val);
    },
    [locale],
  );

  const tp = useCallback(
    <T = string,>(slug: string, field: string): T | undefined =>
      resolve(productMessages[locale], `${slug}.${field}`) as T | undefined,
    [locale],
  );

  const tc = useCallback(
    (category: string, field: "label" | "blurb") =>
      resolve(categoryMessages[locale], `${category}.${field}`) as
        | string
        | undefined,
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tp, tc }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nCtx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
