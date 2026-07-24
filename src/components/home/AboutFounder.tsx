"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Founder / About section. The credibility play for a sourcing business: the
 * founder's headshot + bio, backed by real photos of him at the manufacturer's
 * plant — with the CEO and on the factory floor with the engineering team.
 */
export function AboutFounder() {
  const { t } = useI18n();

  const proof = [
    { src: "/team/with-ceo.jpg", cap: t("about.ceoCaption") },
    { src: "/team/factory-floor.jpg", cap: t("about.factoryCaption") },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
      <Reveal>
        <div className="flex items-baseline justify-between gap-4">
          <p className="kicker">
            <span className="h-px w-8 bg-accent/60" />
            {t("about.kicker")}
          </p>
          <span className="hud-chip hidden sm:inline-flex">SEC 04 · TEAM</span>
        </div>
        <h2 className="mt-5 max-w-2xl font-heading text-4xl font-medium tracking-tight text-titanium sm:text-5xl text-balance">
          {t("about.title")}
        </h2>
      </Reveal>

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        {/* Founder card */}
        <Reveal from="up">
          <div className="overflow-hidden rounded-3xl border border-titanium/[0.08] bg-base-900 shadow-depth">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/team/founder.jpg"
                alt="Moisés del Castillo — Head of Americas Operations at FastForm Americas"
                fill
                sizes="(max-width: 1024px) 90vw, 34vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6">
              <p className="font-heading text-xl tracking-tight text-titanium">
                {t("about.name")}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {t("about.role")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[t("about.tag1"), t("about.tag2"), "EN · ES · PT"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-titanium/10 bg-titanium/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-steel"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bio + proof photos */}
        <Reveal from="up" delay={120}>
          <div className="space-y-5 text-[15px] leading-relaxed text-steel text-pretty">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <p>{t("about.p4")}</p>
          </div>

          {/* Founder intro video — click to play, with sound */}
          <figure className="mt-9">
            <div className="overflow-hidden rounded-2xl border border-titanium/[0.08] bg-base-900 shadow-depth">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                className="aspect-video w-full"
                controls
                playsInline
                preload="none"
                poster="/video/founder-intro-poster.jpg"
                aria-label={t("about.watch")}
              >
                <source src="/video/founder-intro.mp4" type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              {t("about.watch")}
            </figcaption>
          </figure>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {proof.map((ph) => (
              <figure
                key={ph.src}
                className="overflow-hidden rounded-2xl border border-titanium/[0.08] bg-base-900 shadow-depth"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={ph.src}
                    alt={ph.cap}
                    fill
                    sizes="(max-width: 640px) 90vw, 28vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs leading-relaxed text-steel">
                  {ph.cap}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
