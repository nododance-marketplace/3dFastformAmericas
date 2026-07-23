"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/ui/ProductImage";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CategoryBadge } from "./CategoryBadge";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/I18nProvider";

export function ProductCard({ product }: { product: Product }) {
  const { t, tp } = useI18n();
  return (
    <SpotlightCard
      as="article"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-titanium/[0.07] bg-base-900/60 shadow-depth transition-colors duration-500 hover:border-titanium/15"
    >
      {/* Whole card is the click target → product page. */}
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="absolute inset-0 z-[3]"
      />

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ProductImage
          src={product.images[0]}
          alt={`${product.name} — ${product.specLine}`}
          category={product.category}
          label={product.name}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Top-corner model tag — decorative, clicks pass through to the card. */}
        <span className="pointer-events-none absolute right-3 top-3 z-[4] rounded-md border border-titanium/10 bg-base/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-titanium backdrop-blur">
          {product.slug.toUpperCase()}
        </span>
      </div>

      <div className="relative z-[2] flex flex-1 flex-col gap-3 p-6">
        <div>
          <div className="flex items-center justify-between gap-2">
            <CategoryBadge category={product.category} />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
              P/N {product.slug.toUpperCase()}
            </span>
          </div>
          <div className="rule-ticks mt-3" aria-hidden="true" />
        </div>

        <h3 className="font-heading text-xl tracking-tight text-titanium">
          {product.name}
        </h3>

        <p className="font-mono text-xs leading-relaxed tracking-[0.02em] text-steel">
          {tp(product.slug, "specLine") ?? product.specLine}
        </p>

        <div className="mt-auto flex items-center justify-end pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors group-hover:text-titanium">
            {t("card.viewDetails")}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}
