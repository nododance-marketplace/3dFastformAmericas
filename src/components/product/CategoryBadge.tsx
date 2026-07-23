"use client";

import type { Category } from "@/lib/types";
import { useI18n } from "@/i18n/I18nProvider";

const STYLES: Record<Category, string> = {
  Desktop: "border-steel/50 text-steel",
  Dental: "border-accent/40 text-accent",
  Industrial: "border-titanium/40 text-titanium",
  Thermal: "border-accent-signal/50 bg-accent-signal/10 text-accent",
  "Powder Production": "border-accent/50 bg-accent/10 text-accent",
  Design: "border-accent/50 bg-accent/10 text-accent",
  AI: "border-accent/50 bg-accent/10 text-accent",
  SLS: "border-steel/50 text-steel",
  Resin: "border-accent/40 text-accent",
  "Large-Format FDM": "border-titanium/40 text-titanium",
};

export function CategoryBadge({ category }: { category: Category }) {
  const { tc } = useI18n();
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${STYLES[category]}`}
    >
      {tc(category, "label") ?? category}
    </span>
  );
}
