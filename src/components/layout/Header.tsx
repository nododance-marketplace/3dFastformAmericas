"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { CartIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/I18nProvider";

const NAV = [
  { href: "/shop", label: "nav.shop" },
  { href: "/contact", label: "nav.contact" },
];

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
          scrolled || menuOpen
            ? "glass border-b border-titanium/[0.08]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── BRAND LOCKUP ───────────────────────────────────────────
              Code-drawn FastForm logo (see BrandLockup). The old StrataLabs
              raster artwork has been retired.                             */}
          <Link
            href="/"
            className="transition-opacity hover:opacity-80"
            aria-label={t("nav.homeAria")}
          >
            <BrandLockup />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors ${
                    active ? "text-accent font-medium" : "text-steel hover:text-accent"
                  }`}
                >
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={t("nav.openCart")}
              className="relative rounded-full p-2.5 text-titanium transition-colors hover:bg-titanium/[0.06]"
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold tabular-nums text-base">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={t("nav.toggleMenu")}
              aria-expanded={menuOpen}
              className="rounded-full p-2.5 text-titanium transition-colors hover:bg-titanium/[0.06] md:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu — near-solid light panel so text stays legible over
            any page content/video behind it. */}
        <div
          className={`overflow-hidden border-t border-titanium/[0.08] bg-base-900/95 backdrop-blur-xl shadow-[0_24px_48px_-16px_rgba(15,30,54,0.25)] md:hidden ${
            menuOpen ? "max-h-64" : "max-h-0 border-t-0"
          } transition-[max-height] duration-300`}
        >
          <nav className="flex flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-titanium/[0.08] py-3.5 text-sm font-medium text-titanium last:border-0"
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
