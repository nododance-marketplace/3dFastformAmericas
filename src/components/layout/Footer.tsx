"use client";

import Link from "next/link";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  const year = 2026; // Static to keep this a server component; update as needed.

  return (
    <footer className="relative mt-32 border-t border-titanium/[0.10] bg-base-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
              aria-label={t("nav.homeAria")}
            >
              <BrandLockup />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              {t("footer.tagline")}
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:envishonlabs3d@gmail.com"
                  className="text-titanium transition-colors hover:text-accent"
                >
                  envishonlabs3d@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+19804022520"
                  className="text-titanium transition-colors hover:text-accent"
                >
                  980 402 2520
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-steel">
              {t("footer.explore")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/shop" className="text-titanium hover:text-accent">
                  {t("footer.shopPrinters")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-titanium hover:text-accent">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-steel">
              {t("footer.categories")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/shop?category=Desktop"
                  className="text-titanium hover:text-accent"
                >
                  {t("footer.desktopSlm")}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Dental"
                  className="text-titanium hover:text-accent"
                >
                  {t("footer.dentalSlm")}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Industrial"
                  className="text-titanium hover:text-accent"
                >
                  {t("footer.industrialSlm")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-titanium/[0.08] pt-6 text-xs text-steel sm:flex-row sm:items-center">
          <p>{t("footer.rights", { year })}</p>
          <p className="text-steel/70">
            {t("footer.tagline2")}
          </p>
        </div>
      </div>
    </footer>
  );
}
