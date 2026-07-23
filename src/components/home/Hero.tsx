"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Parallax } from "@/components/ui/Parallax";
import { Counter } from "@/components/ui/Counter";
import { Magnetic } from "@/components/ui/Magnetic";
import { getAvailableProducts } from "@/data/products";
import { useI18n } from "@/i18n/I18nProvider";

// Live machine readouts for the base ticker — real model codes and spec
// lines straight from the catalog, never invented copy.
const READOUT = getAvailableProducts().map(
  (p) => `${p.name} :: ${p.specLine}`,
);

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative -mt-16 flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-base pt-16">
      {/* ── Light ambient backdrop ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 bg-violet-mesh opacity-70" />
      <Parallax speed={0.05} className="pointer-events-none absolute inset-0">
        <div className="tech-grid h-full w-full opacity-80" />
      </Parallax>
      <div className="pointer-events-none absolute -left-24 top-1/4 h-[40vh] w-[40vh] rounded-full bg-accent/10 blur-[150px] animate-float" />
      <div className="pointer-events-none absolute bottom-24 right-10 h-[30vh] w-[30vh] rounded-full bg-accent-signal/10 blur-[130px] animate-float [animation-delay:-4s]" />

      {/* ── Split content: copy · machine ───────────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="kicker mx-auto mb-7 w-fit animate-fade-up rounded-full border border-titanium/10 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-sm lg:mx-0">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
            {t("hero.badge")}
          </p>

          <h1 className="animate-fade-up font-heading text-[clamp(2.9rem,7.5vw,6rem)] font-bold uppercase leading-[0.92] tracking-[-0.01em] text-titanium text-balance [animation-delay:60ms]">
            {t("hero.title1")}
            <br />
            <span className="text-spark">{t("hero.title2")}</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-steel text-pretty [animation-delay:140ms] lg:mx-0">
            {t("hero.sub")}
          </p>

          <div className="mt-9 flex animate-fade-up flex-wrap items-center justify-center gap-4 [animation-delay:220ms] lg:justify-start">
            <Magnetic>
              <Link href="/shop" className="btn-spark group px-8 py-4 text-sm">
                {t("hero.shop")}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link href="/contact" className="btn-ghost px-8 py-4 text-sm">
              {t("hero.talk")}
            </Link>
          </div>

          {/* Stat rail — animated counters */}
          <dl className="mx-auto mt-12 grid max-w-xl animate-fade-up grid-cols-3 divide-x divide-titanium/[0.12] border-y border-titanium/[0.12] py-6 [animation-delay:300ms] lg:mx-0">
            <div className="px-1.5 sm:px-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite sm:text-[11px] sm:tracking-[0.2em]">
                {t("hero.machines")}
              </dt>
              <dd className="mt-1.5 font-heading text-2xl font-semibold text-titanium sm:text-4xl">
                <Counter value={7} suffix="+" />
              </dd>
            </div>
            <div className="px-1.5 sm:px-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite sm:text-[11px] sm:tracking-[0.2em]">
                {t("hero.accuracy")}
              </dt>
              <dd className="mt-1.5 font-heading text-2xl font-semibold text-titanium sm:text-4xl">
                ±<Counter value={0.05} decimals={2} />
                <span className="text-sm text-graphite sm:text-lg">mm</span>
              </dd>
            </div>
            <div className="px-1.5 sm:px-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite sm:text-[11px] sm:tracking-[0.2em]">
                {t("hero.support")}
              </dt>
              <dd className="mt-1.5 font-heading text-2xl font-semibold text-titanium sm:text-4xl">
                {t("hero.supportValue")}
              </dd>
            </div>
          </dl>
        </div>

        {/* Machine — the FastForm FF-M300 on a soft-lit platform */}
        <div className="relative animate-fade-up [animation-delay:180ms]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[90px]" />
          <Parallax speed={-0.08}>
            <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-[2rem] border border-titanium/[0.08] bg-gradient-to-b from-white to-base-800 shadow-depth-lg">
              <Image
                src="/products/ff-m300.jpg"
                alt="FastForm FF-M300 industrial metal 3D printer"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain p-6"
              />
              <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite">
                FF-M300 · SLM
              </span>
            </div>
          </Parallax>
        </div>
      </div>

      {/* Base ticker — live machine readouts from the actual catalog. */}
      <div className="relative z-10 overflow-hidden border-t border-titanium/[0.08] bg-white/60 py-3 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap motion-reduce:animate-none">
          {[...READOUT, ...READOUT].map((line, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite"
            >
              {line}
              <span className="text-accent/50">▮</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
