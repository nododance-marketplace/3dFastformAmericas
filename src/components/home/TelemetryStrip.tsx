"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * A full-width instrument readout that sits just under the hero — the spec
 * panel that used to live in the hero, reimagined as a horizontal telemetry
 * strip. A slow scanline sweeps across the row.
 */
export function TelemetryStrip() {
  const { t } = useI18n();
  const READOUT = [
    { k: t("telemetry.segment"), v: t("telemetry.segmentV") },
    { k: t("telemetry.process"), v: t("telemetry.processV") },
    { k: t("telemetry.build"), v: t("telemetry.buildV") },
    { k: t("telemetry.accuracy"), v: t("telemetry.accuracyV") },
  ];
  return (
    <section className="relative -mt-px border-y border-titanium/[0.07] bg-base-900/60">
      {/* sweeping scanline */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-transparent via-accent/[0.07] to-transparent animate-[marquee_9s_linear_infinite] motion-reduce:hidden" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        <Reveal from="left" className="flex items-center gap-3 lg:w-52 lg:shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            {t("telemetry.live")}
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-steel lg:hidden">
            EN · SLM
          </span>
        </Reveal>

        <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-titanium/[0.08]">
          {READOUT.map((row, i) => (
            <Reveal
              key={row.k}
              delay={i * 80}
              from="up"
              className="sm:px-6 sm:first:pl-0"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
                {row.k}
              </dt>
              <dd className="mt-1.5 font-heading text-base text-titanium sm:text-lg">
                {row.v}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={160} className="lg:shrink-0">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-colors hover:text-titanium"
          >
            {t("telemetry.explore")}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
