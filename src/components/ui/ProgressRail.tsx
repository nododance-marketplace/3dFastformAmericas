"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

interface RailSection {
  /** DOM id of the section to track. */
  id: string;
  /** Short mono label shown on hover/active. */
  label: string;
}

/**
 * Thin sticky section rail pinned to the right edge on large screens — a
 * machined index of the page. A hairline track, one tick per section, the
 * active tick lit. Ticks are anchor links (keyboard reachable); the whole
 * rail is skipped on mobile and hidden from nothing — it's real navigation.
 * Transform/opacity only; IntersectionObserver, no scroll math per frame.
 */
export function ProgressRail({ sections }: { sections: RailSection[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current?.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A narrow band around the viewport centre decides the active section.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const s of sections) {
      const node = document.getElementById(s.id);
      if (node) observer.current.observe(node);
    }
    return () => observer.current?.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 xl:block"
    >
      <ol className="flex flex-col items-end gap-4 border-r border-titanium/[0.08] pr-3">
        {sections.map((s, i) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="group relative flex items-center gap-2">
              <span
                className={`whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] transition-opacity duration-300 ${
                  isActive
                    ? "text-accent opacity-100"
                    : "text-graphite opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                }`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")} · {t(s.label)}
              </span>
              <a
                href={`#${s.id}`}
                aria-label={t(s.label)}
                aria-current={isActive ? "true" : undefined}
                className="relative flex h-4 w-4 items-center justify-center"
              >
                <span
                  className={`block h-px transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "w-4 bg-accent shadow-[0_0_6px_rgba(36,75,150,0.6)]"
                      : "w-2.5 bg-steel/40 group-hover:bg-steel"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
