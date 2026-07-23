import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { I18nProvider } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

// Display / headings — squared, mechanical, tech. Strong in bold caps.
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://3d-fastform-americas.vercel.app"),
  title: {
    default: "FastForm Americas — Industrial Metal 3D Printers",
    template: "%s · FastForm Americas",
  },
  description:
    "FastForm Americas — industrial SLM/LPBF metal 3D printers for the Americas. The DeskFab, FF-M series, and AiForm-G1 platforms.",
  keywords: [
    "FastForm",
    "FastForm Americas",
    "industrial metal 3D printers",
    "SLM",
    "LPBF",
    "metal 3D printing",
  ],
  openGraph: {
    title: "FastForm Americas — Industrial Metal 3D Printers",
    description: "Industrial SLM/LPBF metal 3D printers for the Americas.",
    type: "website",
    siteName: "FastForm Americas",
  },
};

// Organization schema (JSON-LD) with contact details.
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FastForm Americas",
  // TODO: swap to the FastForm Americas domain + contact once provisioned.
  email: "envishonlabs3d@gmail.com",
  telephone: "+19803192013",
  areaServed: "Americas",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "envishonlabs3d@gmail.com",
    telephone: "+19803192013",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <GrainOverlay />
        <I18nProvider>
          <CartProvider>
            <Header />
            <main id="main" className="min-h-[60vh] pt-16">
              {children}
            </main>
            <Footer />
          </CartProvider>
          <LanguageSwitcher />
        </I18nProvider>
      </body>
    </html>
  );
}
