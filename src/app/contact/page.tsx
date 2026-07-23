import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to FastForm about sourcing an industrial SLM, SLS, or large-format FDM 3D printer for your business.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <FadeIn>
          <div className="lg:sticky lg:top-28">
            <p className="kicker">
              <span className="h-px w-8 bg-accent/60" />
              <T k="contact.kicker" />
            </p>
            <h1 className="mt-5 font-heading text-4xl font-medium leading-[1.03] tracking-tight text-titanium sm:text-6xl text-balance">
              <T k="contact.title1" />
              <br />
              <T k="contact.title2" />
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-steel">
              <T k="contact.sub" />
            </p>

            {/* Who you're reaching — a real person on the Americas side. */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-titanium/[0.08] bg-base-900 p-4 shadow-depth">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/30">
                <Image
                  src="/team/founder.jpg"
                  alt="Moisés Castillo"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-heading text-titanium">Moisés Castillo</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  <T k="about.role" />
                </p>
              </div>
            </div>

            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                  <T k="contact.email" />
                </dt>
                <dd className="mt-1">
                  <a
                    href="mailto:moisesjdelcastillo@gmail.com"
                    className="text-titanium transition-colors hover:text-accent"
                  >
                    moisesjdelcastillo@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                  <T k="contact.phone" />
                </dt>
                <dd className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <a
                    href="tel:+19803192013"
                    className="text-titanium transition-colors hover:text-accent"
                  >
                    +1 980 319 2013
                  </a>
                  <a
                    href="https://wa.me/19803192013"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-2.5 py-0.5 text-xs font-medium text-[#128C4B] transition-colors hover:bg-[#25D366]/20"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.08-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.15.19 2.02 3.08 4.9 4.32.68.29 1.22.47 1.63.6.69.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM12 2a10 10 0 00-8.6 15.06L2 22l5.05-1.32A10 10 0 1012 2z" />
                    </svg>
                    WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                  <T k="contact.website" />
                </dt>
                <dd className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <a
                    href="https://envishonlabs3d.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-titanium transition-colors hover:text-accent"
                  >
                    envishonlabs3d.com
                  </a>
                  <span className="rounded-full border border-accent/25 bg-accent/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-accent">
                    <T k="contact.websiteNote" />
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                  <T k="contact.basedIn" />
                </dt>
                <dd className="mt-1 text-titanium">
                  <T k="contact.basedInValue" />
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                  <T k="contact.response" />
                </dt>
                <dd className="mt-1 text-titanium">
                  <T k="contact.responseValue" />
                </dd>
              </div>
            </dl>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
