"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/I18nProvider";
import { SEQUENCE_END_BLUE } from "./HeaderSequence";

/**
 * The blue "Built for the Americas" band. Its background is the exact blue the
 * header sequence dissolves to, so the content simply fades in out of the
 * intro. Features the Americas globe and the looping flags-behind-the-lineup
 * video, then eases back to white for the catalog telemetry strip below.
 */
export function AmericasSection() {
  const { t } = useI18n();

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: SEQUENCE_END_BLUE }}
    >
      {/* depth: a brighter pool up top, a soft vignette around it */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.14),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.12]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-24 sm:px-6 sm:pb-36 sm:pt-32 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          {/* Globe — Americas highlighted */}
          <div className="relative mx-auto mb-9 h-40 w-40 sm:h-56 sm:w-56">
            <div className="absolute inset-0 rounded-full bg-white/20 blur-3xl" />
            <Image
              src="/brand/globe-americas.png"
              alt="Globe highlighting the Americas"
              fill
              sizes="224px"
              className="animate-float object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
            />
          </div>

          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            {t("americas.kicker")}
          </p>
          <h2 className="mt-5 font-heading text-4xl font-medium leading-[1.02] tracking-tight text-white text-balance sm:text-6xl">
            {t("americas.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80 text-pretty">
            {t("americas.sub")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-accent transition-all duration-300 hover:bg-white/90 active:scale-[0.98]"
              >
                {t("hero.shop")}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/70 hover:bg-white/10 active:scale-[0.98]"
            >
              {t("hero.talk")}
            </Link>
          </div>
        </Reveal>

        {/* Flags behind the lineup — looping */}
        <Reveal delay={140} className="mt-16 sm:mt-20">
          <figure className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              <video
                className="aspect-video w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/video/flags-americas-poster.jpg"
                aria-label="The FastForm lineup with flags of the Americas"
              >
                <source src="/video/flags-americas.mp4" type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              {t("americas.videoCaption")}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* ease from blue back into the white telemetry strip below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
