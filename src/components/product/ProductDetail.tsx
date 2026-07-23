"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import {
  products,
  CATEGORY_META,
  formatPrice,
} from "@/data/products";
import { getAccessoryConfig } from "@/data/accessories";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductImage } from "@/components/ui/ProductImage";
import { CategoryBadge } from "@/components/product/CategoryBadge";
import { AccessoryConfigurator } from "@/components/product/AccessoryConfigurator";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { useI18n } from "@/i18n/I18nProvider";
import {
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  FileTextIcon,
  ShieldIcon,
} from "@/components/ui/icons";

/**
 * Full product detail body. A client component so every field — including the
 * localized description, highlights, spec-line, and category blurb — swaps with
 * the active language. The route file stays a Server Component (keeps SSG +
 * metadata) and just renders this.
 */
export function ProductDetail({ product }: { product: Product }) {
  const { t, tp, tc } = useI18n();

  const related = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.slug !== product.slug &&
        !p.comingSoon,
    )
    .slice(0, 3);

  const accessoryConfig = getAccessoryConfig(product.slug);
  const isBuyable = product.priceCents != null && !product.inquiryOnly;

  const specLine = tp(product.slug, "specLine") ?? product.specLine;
  const description = tp(product.slug, "description") ?? product.description;
  const highlights =
    tp<string[]>(product.slug, "highlights") ?? product.highlights;
  const categoryLabel = tc(product.category, "label") ?? product.category;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-steel">
        <Link href="/shop" className="transition-colors hover:text-accent">
          {t("product.breadcrumb")}
        </Link>
        <span className="text-steel/40">/</span>
        <span className="text-titanium">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery
            images={product.images}
            name={product.name}
            category={product.category}
          />
          <div className="mt-4 hidden items-center justify-between lg:flex">
            <span className="hud-chip">
              {categoryLabel} · {product.slug.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
              FASTFORM // US
            </span>
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <CategoryBadge category={product.category} />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
              P/N {product.slug.toUpperCase()}
            </span>
          </div>
          <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight text-titanium sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 font-mono text-xs tracking-[0.02em] text-steel sm:text-sm">
            {specLine}
          </p>

          <p className="mt-6 max-w-prose text-base leading-relaxed text-steel">
            {description}
          </p>

          {isBuyable && accessoryConfig && accessoryConfig.mode !== "tbd" ? (
            <AccessoryConfigurator
              product={product}
              config={accessoryConfig}
              buyable={isBuyable}
            />
          ) : product.priceCents != null && !product.inquiryOnly ? (
            <>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="font-heading text-2xl text-titanium">
                  {formatPrice(product.priceCents)}
                </span>
                <AddToCartButton product={product} />
              </div>
              <p className="mt-3 text-xs text-steel">
                {t("product.secureNote")}{" "}
                <Link
                  href="/contact"
                  className="text-accent hover:text-accent-signal"
                >
                  {t("product.contactTeam")}
                </Link>
                .
              </p>
            </>
          ) : (
            <>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {product.priceCents != null ? (
                  <span className="font-heading text-2xl text-titanium">
                    {t("product.from", { price: formatPrice(product.priceCents) })}
                  </span>
                ) : (
                  <span className="text-sm uppercase tracking-[0.2em] text-steel">
                    {t("product.pricingOnRequest")}
                  </span>
                )}
                <Link href="/contact" className="btn-spark group px-7 py-3.5 text-sm">
                  {t("product.talkToSales")}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <p className="mt-3 text-xs text-steel">
                {product.inquiryOnly
                  ? t("product.inquiryNote")
                  : t("product.configuredNote")}
              </p>
            </>
          )}

          {/* Downloadable quotation PDF */}
          {product.quotePdf && (
            <a
              href={product.quotePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.06] px-6 py-3 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent/15"
            >
              <FileTextIcon className="h-4 w-4" />
              {t("product.viewQuote")}
            </a>
          )}

          {/* Competitor price comparison */}
          {product.compareAtCents != null && product.priceCents != null && (
            <div className="mt-5 rounded-xl border border-accent/25 bg-accent/[0.05] px-5 py-4">
              <p className="text-sm leading-relaxed text-titanium">
                {t("product.competitor")}{" "}
                <span className="text-steel line-through">
                  {formatPrice(product.compareAtCents)}
                </span>
                . {t("product.save")}{" "}
                <span className="font-semibold text-accent">
                  {formatPrice(product.compareAtCents - product.priceCents)}
                </span>{" "}
                {t("product.withFastform")}
              </p>
              {product.compareUrl && (
                <a
                  href={product.compareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-xs text-accent transition-colors hover:text-accent-signal"
                >
                  {t("product.seePrice")}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Downloadable spec sheet */}
          {product.datasheet && (
            <a
              href={product.datasheet}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-titanium/20 px-6 py-3 text-sm font-medium text-titanium transition-all hover:border-accent/50 hover:text-accent"
            >
              <DownloadIcon className="h-4 w-4" />
              {t("product.downloadSpec")}
            </a>
          )}

          {/* Key highlights */}
          {highlights && highlights.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-steel">
                {t("product.highlights")}
              </h2>
              <ul className="mt-5 space-y-3">
                {highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-titanium">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spec table — technical values stay universal across languages. */}
          <div className="mt-12">
            <div className="flex items-baseline justify-between">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                {t("product.techParams")}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                {t("product.fields", {
                  n: String(product.specs.length).padStart(2, "0"),
                  name: product.name,
                })}
              </span>
            </div>
            <div className="rule-ticks mt-3" aria-hidden="true" />
            <dl className="divide-y divide-titanium/[0.08]">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-[2.25rem_1fr_1.4fr] items-baseline gap-3 py-3 text-sm transition-colors hover:bg-titanium/[0.02]"
                >
                  <span
                    className="font-mono text-[10px] tabular-nums text-graphite"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt className="font-mono text-[12px] uppercase tracking-[0.06em] text-steel">
                    {spec.label}
                  </dt>
                  <dd className="text-right font-mono text-[13px] tabular-nums text-titanium">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="rule-ticks rotate-180" aria-hidden="true" />
          </div>

          {/* Manufacturer compliance */}
          {product.compliance && (
            <div className="mt-8 rounded-2xl border border-titanium/[0.08] bg-base-900/60 p-5">
              <div className="flex items-center gap-2">
                <ShieldIcon className="h-4 w-4 shrink-0 text-accent" />
                <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                  {t("product.compliance")}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-steel">
                {t("product.complianceText")}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-steel/60">
                {t("product.complianceHeld")}
              </p>
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-titanium/[0.08] bg-base-900/60 p-5 text-sm text-steel">
            {tc(product.category, "blurb") ??
              CATEGORY_META[product.category].blurb}
          </div>
        </div>
      </div>

      {/* What it prints — real sample parts from the 2026 catalog. */}
      {product.printedParts && product.printedParts.length > 0 && (
        <section className="mt-24">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="kicker">{t("product.sampleOutput")}</p>
              <h2 className="mt-2 font-heading text-2xl tracking-tight text-titanium sm:text-3xl">
                {t("product.whatItPrints", { name: product.name })}
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-graphite sm:block">
              {t("product.partsCount", {
                n: String(product.printedParts.length).padStart(2, "0"),
              })}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel">
            {t("product.partsDesc", { name: product.name })}
          </p>
          <div
            className={`mt-8 grid gap-6 ${
              product.printedParts.length > 1 ? "sm:grid-cols-2" : "max-w-xl"
            }`}
          >
            {product.printedParts.map((src, i) => (
              <figure
                key={src}
                className="group overflow-hidden rounded-2xl border border-titanium/[0.08] bg-white shadow-depth"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <ProductImage
                    src={src}
                    alt={`${product.name} sample printed part ${i + 1}`}
                    category={product.category}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-28">
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-2xl tracking-tight text-titanium">
              {t("product.moreCategory", { category: categoryLabel })}
            </h2>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="group inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-signal"
            >
              {t("product.viewCategory")}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex items-center justify-between rounded-xl border border-titanium/[0.08] bg-base-900/60 p-5 transition-colors hover:border-accent/30"
              >
                <div>
                  <p className="font-heading text-titanium">{p.name}</p>
                  <p className="mt-1 text-xs text-steel">
                    {tp(p.slug, "specLine") ?? p.specLine}
                  </p>
                </div>
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-steel transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
