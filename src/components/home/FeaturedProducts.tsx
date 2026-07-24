"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Home — the machine lineup. Rather than displaying four product cards on the
 * front page, we show one clean lineup shot of the whole fleet that links
 * straight through to /shop. Keeps the homepage short; the shop is where you
 * browse individual machines.
 */
export function FeaturedProducts() {
  const { t } = useI18n();

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="kicker">
            <span className="h-px w-8 bg-accent/60" />
            {t("featured.kicker")}
          </p>
          <h2 className="font-heading text-4xl font-medium tracking-tight text-titanium sm:text-5xl text-balance">
            {t("featured.title")}
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-steel text-pretty">
            {t("featured.sub")}
          </p>
        </div>
      </Reveal>

      <Reveal delay={120} from="up">
        <Link
          href="/shop"
          aria-label={t("featured.viewAll")}
          className="group relative mt-10 block overflow-hidden rounded-3xl border border-titanium/[0.08] bg-white shadow-depth-lg transition-transform duration-500 hover:-translate-y-1"
        >
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
            <Image
              src="/brand/fleet.jpg"
              alt="The full FastForm Americas lineup — DeskFab, FF-M140, FF-M300, FF-M420 and FF-M220 metal 3D printers"
              fill
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-8"
            />
          </div>

          {/* CTA bar — fades up from the white base of the image */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-white via-white/85 to-transparent px-6 pb-6 pt-16 sm:px-8 sm:pb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
              {t("featured.chip")}
            </span>
            <span className="btn-spark inline-flex items-center gap-1.5 px-6 py-3 text-sm">
              {t("featured.viewAll")}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Reveal>

      {/* Attribution to the global FastForm brand (the manufacturer). */}
      <Reveal delay={80}>
        <p className="mt-6 text-center text-[13px] text-graphite">
          {t("featured.originLabel")} ·{" "}
          <a
            href="https://fastform3d.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline-offset-4 transition-colors hover:text-titanium hover:underline"
          >
            fastform3d.com
          </a>
        </p>
      </Reveal>
    </section>
  );
}
