"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/I18nProvider";

/** Confirmation shown after a successful Stripe Checkout. Clears the cart. */
export function CheckoutSuccess() {
  const { t } = useI18n();
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <div className="rounded-full border border-accent/40 p-5 text-accent shadow-accent">
        <CheckIcon className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-heading text-3xl font-medium tracking-tight text-titanium">
        {t("checkout.title")}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-steel">
        {t("checkout.body")}
      </p>
      <Link href="/shop" className="btn-spark group mt-8 px-7 py-3.5 text-sm">
        {t("checkout.back")}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
