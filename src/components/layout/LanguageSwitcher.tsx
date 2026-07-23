"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_META } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { Flag } from "@/components/i18n/Flag";

/**
 * Sticky corner language switcher (EN · ES · PT with US / Mexican / Brazilian
 * flags). Fixed to the bottom-right so it follows the reader down the page.
 */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cur = LOCALE_META[locale];

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-40 print:hidden">
      {/* Options popover */}
      <div
        role="listbox"
        aria-label={t("lang.aria")}
        className={`absolute bottom-full right-0 mb-2 min-w-[190px] overflow-hidden rounded-xl border border-titanium/10 bg-white/95 shadow-depth backdrop-blur transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0"
        }`}
      >
        {LOCALES.map((l) => {
          const m = LOCALE_META[l];
          const active = l === locale;
          return (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors ${
                active
                  ? "bg-accent/[0.08] text-titanium"
                  : "text-steel hover:bg-titanium/[0.04] hover:text-titanium"
              }`}
            >
              <Flag code={m.flag} className="h-4 w-6" />
              <span className="font-mono text-xs font-semibold tracking-wide">
                {m.code}
              </span>
              <span className="text-xs text-graphite">{m.label}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("lang.aria")}
        className="flex items-center gap-2 rounded-full border border-titanium/10 bg-white/90 px-3.5 py-2.5 shadow-depth backdrop-blur transition-colors hover:border-accent/40"
      >
        <Flag code={cur.flag} className="h-4 w-6" />
        <span className="font-mono text-xs font-semibold tracking-wide text-titanium">
          {cur.code}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`text-graphite transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
