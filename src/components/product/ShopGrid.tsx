"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import type { Category, Product } from "@/lib/types";
import { CATEGORIES } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { useI18n } from "@/i18n/I18nProvider";

type Filter = "All" | Category;

const FILTERS: Filter[] = ["All", ...CATEGORIES];

export function ShopGrid({ products }: { products: Product[] }) {
  const { t, tc } = useI18n();
  const params = useSearchParams();
  const initial = params.get("category");
  const initialFilter: Filter =
    initial && (CATEGORIES as string[]).includes(initial)
      ? (initial as Category)
      : "All";

  const [active, setActive] = useState<Filter>(initialFilter);

  // ── Sliding indicator ────────────────────────────────────────────────
  // One violet pill glides beneath the active chip instead of each button
  // repainting. Measured from the real DOM so it survives wrapping/resize.
  const barRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Map<Filter, HTMLButtonElement>>(new Map());
  const [pill, setPill] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const measure = () => {
    const bar = barRef.current;
    const btn = btnRefs.current.get(active);
    if (!bar || !btn) return;
    const b = bar.getBoundingClientRect();
    const r = btn.getBoundingClientRect();
    setPill({ x: r.left - b.left, y: r.top - b.top, w: r.width, h: r.height });
  };

  useLayoutEffect(measure, [active]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const filtered = useMemo(
    () =>
      active === "All"
        ? products
        : products.filter((p) => p.category === active),
    [active, products],
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-y-3">
        <div ref={barRef} className="relative flex flex-wrap gap-2.5">
          {/* the glide pill */}
          {pill && (
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 rounded-full bg-accent shadow-accent transition-[transform,width,height] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              style={{
                transform: `translate3d(${pill.x}px, ${pill.y}px, 0)`,
                width: pill.w,
                height: pill.h,
              }}
            />
          )}
          {FILTERS.map((filter) => {
            const isActive = filter === active;
            return (
              <button
                key={filter}
                ref={(node) => {
                  if (node) btnRefs.current.set(filter, node);
                  else btnRefs.current.delete(filter);
                }}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={isActive}
                className={`relative z-10 rounded-full border px-5 py-2 text-sm transition-colors duration-300 active:scale-[0.97] ${
                  isActive
                    ? "border-transparent text-base"
                    : "border-titanium/10 text-steel hover:border-accent/40 hover:text-accent"
                }`}
              >
                {filter === "All" ? t("grid.all") : tc(filter, "label") ?? filter}
              </button>
            );
          })}
        </div>
        <span className="ml-auto pl-4 font-mono text-xs uppercase tracking-[0.16em] text-steel">
          {String(filtered.length).padStart(2, "0")}{" "}
          {filtered.length === 1 ? t("grid.machine") : t("grid.machines")}
        </span>
      </div>

      <div className="rule-ticks mt-6" aria-hidden="true" />

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-titanium/10 px-8 py-20 text-center">
          <p className="text-titanium">{t("grid.emptyTitle")}</p>
          <button
            type="button"
            onClick={() => setActive("All")}
            className="mt-3 text-sm text-steel underline-offset-4 hover:text-titanium hover:underline"
          >
            {t("grid.showAll")}
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <FadeIn key={product.slug} delay={Math.min(i, 6) * 70}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
