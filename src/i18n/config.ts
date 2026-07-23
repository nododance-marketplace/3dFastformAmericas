/**
 * ─────────────────────────────────────────────────────────────────────────
 *  I18N CONFIG — FastForm Americas (EN / ES / PT)
 * ─────────────────────────────────────────────────────────────────────────
 *  The site serves the whole Americas, so it ships in English, Spanish, and
 *  Portuguese. Locale is a client choice, persisted to localStorage + a cookie
 *  and applied via a React context (see I18nProvider). Product prices stay in
 *  USD across all languages.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Locale = "en" | "es" | "pt";

export const LOCALES: Locale[] = ["en", "es", "pt"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "ff-locale";

export const LOCALE_META: Record<
  Locale,
  { code: string; label: string; flag: "us" | "mx" | "br" }
> = {
  en: { code: "EN", label: "English", flag: "us" },
  es: { code: "ES", label: "Español", flag: "mx" },
  pt: { code: "PT", label: "Português", flag: "br" },
};

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as string[]).includes(v);
}
