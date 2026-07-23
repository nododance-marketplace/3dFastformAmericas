"use client";

import { useI18n } from "@/i18n/I18nProvider";

/**
 * Render a translated UI string by key. A tiny client component so it can be
 * dropped inside Server Components (shop/contact/product pages) without turning
 * the whole page client. For string props (aria-label, placeholder) use the
 * useI18n() hook in a client component instead.
 */
export function T({
  k,
  vars,
}: {
  k: string;
  vars?: Record<string, string | number>;
}) {
  const { t } = useI18n();
  return <>{t(k, vars)}</>;
}
