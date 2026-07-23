"use client";

import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/I18nProvider";

export function FeaturedProducts() {
  const { t } = useI18n();
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-40 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-baseline gap-6">
              <p className="kicker">
                <span className="h-px w-8 bg-accent/60" />
                {t("featured.kicker")}
              </p>
              <span className="hud-chip hidden sm:inline-flex">
                {t("featured.chip")}
              </span>
            </div>
            <h2 className="mt-5 font-heading text-4xl font-medium tracking-tight text-titanium sm:text-5xl text-balance">
              {t("featured.title")}
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-titanium"
          >
            {t("featured.viewAll")}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product, i) => (
          <Reveal key={product.slug} delay={i * 90} from="up">
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
