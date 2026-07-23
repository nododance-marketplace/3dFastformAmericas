import { Suspense } from "react";
import type { Metadata } from "next";
import {
  getAvailableProducts,
  getComingSoonProducts,
} from "@/data/products";
import { ShopGrid } from "@/components/product/ShopGrid";
import { ComingSoonCard } from "@/components/product/ComingSoonCard";
import { ScrollRotationHero } from "@/components/shop/ScrollRotationHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  title: "Shop Printers",
  description:
    "Browse FastForm's catalog of industrial SLM metal 3D printers and the EN-Atomizer powder system — request a quote with US-based support. SLS, resin, and large-format FDM coming soon.",
};

export default function ShopPage() {
  const available = getAvailableProducts();
  const comingSoon = getComingSoonProducts();

  return (
    <>
      {/* Scroll-scrubbed rotation hero — the full lineup turning as you scroll
          (51-frame canvas sequence). Full-bleed, replaces the old banner. */}
      <ScrollRotationHero />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="kicker">
          <span className="h-px w-8 bg-accent/60" />
          <T k="shop.kicker" />
        </p>
        <h1 className="mt-5 font-heading text-4xl font-medium tracking-tight text-titanium sm:text-6xl text-balance">
          <T k="shop.title" />
        </h1>
        <p className="mt-5 text-base leading-relaxed text-steel text-pretty">
          <T k="shop.sub" />
        </p>
      </header>

      <div className="mt-14">
        <Suspense fallback={<GridSkeleton />}>
          <ShopGrid products={available} />
        </Suspense>
      </div>

      {comingSoon.length > 0 && (
        <section className="mt-24">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.24em] text-accent">
                <T k="shop.comingKicker" />
              </p>
              <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-titanium sm:text-4xl">
                <T k="shop.comingTitle" />
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel">
                <T k="shop.comingSub" />
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((product, i) => (
              <FadeIn key={product.slug} delay={Math.min(i, 6) * 70}>
                <ComingSoonCard product={product} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
      </div>
    </>
  );
}

function GridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-titanium/[0.08]"
        >
          <div className="skeleton aspect-[4/3] w-full" />
          <div className="space-y-3 p-6">
            <div className="skeleton h-4 w-20 rounded-full" />
            <div className="skeleton h-5 w-2/3 rounded" />
            <div className="skeleton h-4 w-full rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
