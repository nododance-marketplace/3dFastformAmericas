import type { Metadata } from "next";
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

            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                  <T k="contact.email" />
                </dt>
                <dd className="mt-1">
                  <a
                    href="mailto:envishonlabs3d@gmail.com"
                    className="text-titanium transition-colors hover:text-accent"
                  >
                    envishonlabs3d@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                  <T k="contact.phone" />
                </dt>
                <dd className="mt-1">
                  <a
                    href="tel:+19804022520"
                    className="text-titanium transition-colors hover:text-accent"
                  >
                    980 402 2520
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                  <T k="contact.website" />
                </dt>
                <dd className="mt-1">
                  <a
                    href="https://envishonlabs3d.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-titanium transition-colors hover:text-accent"
                  >
                    envishonlabs3d.com
                  </a>
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
