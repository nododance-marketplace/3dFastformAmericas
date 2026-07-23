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
                  href="mailto:moisesjdelcastillo@gmail.com"
                  className="text-titanium transition-colors hover:text-accent"
                >
                  moisesjdelcastillo@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+19803192013"
                  className="text-titanium transition-colors hover:text-accent"
                >
                  +1 980 319 2013
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/19803192013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-titanium transition-colors hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#25D366]" fill="currentColor" aria-hidden="true">
                    <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.08-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.15.19 2.02 3.08 4.9 4.32.68.29 1.22.47 1.63.6.69.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM12 2a10 10 0 00-8.6 15.06L2 22l5.05-1.32A10 10 0 1012 2z" />
                  </svg>
                  WhatsApp
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
