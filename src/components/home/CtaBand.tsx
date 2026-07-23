"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Closing call-to-action. A full-width violet-mesh band with a parallax glow —
 * the last thing before the footer, pointed straight at a sales conversation.
 */
export function CtaBand() {
  const { t } = useI18n();
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-titanium/[0.08] bg-base-900 px-6 py-20 shadow-depth-lg sm:px-16 sm:py-28">
        <div className="absolute inset-0 bg-violet-mesh" />
        <Parallax speed={0.08} className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-accent-signal/15 blur-[120px]" />
        </Parallax>
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-60" />

        <Reveal className="relative mx-auto max-w-2xl text-center">
          <p className="kicker justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
            {t("cta.kicker")}
          </p>
          <h2 className="mt-6 font-heading text-4xl font-medium leading-[1.02] tracking-tight text-titanium sm:text-6xl text-balance">
            {t("cta.title1")}
            <br className="hidden sm:block" /> {t("cta.title2")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-steel text-pretty">
            {t("cta.sub")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link href="/contact" className="btn-spark group px-8 py-4 text-sm">
                {t("cta.talk")}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link href="/shop" className="btn-ghost px-8 py-4 text-sm">
              {t("cta.browse")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
