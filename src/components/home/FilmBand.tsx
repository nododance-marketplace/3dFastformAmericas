"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Home showcase band — sits under the hero. The old narrated video reels were
 * retired in the FastForm rebrand (they carried the previous supplier's
 * branding). In their place: a gallery of real metal parts printed on the
 * FastForm lineup, straight from the 2026 catalog.
 */

export function FilmBand() {
  const { t } = useI18n();
  const PARTS: { src: string; label: string; machine: string }[] = [
    { src: "/products/ff-g1-part-1.jpg", label: t("film.copper"), machine: "AiForm-G1" },
    { src: "/products/ff-m300-part-1.jpg", label: t("film.turbine"), machine: "FF-M300" },
    { src: "/products/ff-m220-part-1.jpg", label: t("film.honeycomb"), machine: "FF-M220" },
    { src: "/products/ff-m420-part-2.jpg", label: t("film.heatsink"), machine: "FF-M420" },
    { src: "/products/ff-desk-part-2.jpg", label: t("film.lattice"), machine: "DeskFab" },
    { src: "/products/ff-m140-part-2.jpg", label: t("film.bracket"), machine: "FF-M140" },
  ];
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Reveal>
        <div className="flex items-baseline justify-between gap-4">
          <p className="kicker">
            <span className="h-px w-8 bg-accent/60" />
            {t("film.kicker")}
          </p>
          <span className="hud-chip hidden sm:inline-flex">{t("film.chip")}</span>
        </div>
        <h2 className="mt-5 max-w-2xl font-heading text-4xl font-medium tracking-tight text-titanium sm:text-5xl text-balance">
          {t("film.title")}
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-steel text-pretty">
          {t("film.sub")}
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {PARTS.map((part, i) => (
          <Reveal key={part.src} delay={Math.min(i, 6) * 70}>
            <figure className="group relative overflow-hidden rounded-2xl border border-titanium/[0.08] bg-white shadow-depth">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={part.src}
                  alt={`${part.label} printed on the FastForm ${part.machine}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
                <span className="text-sm font-medium text-titanium">
                  {part.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                  {part.machine}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
