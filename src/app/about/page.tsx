import type { Metadata } from "next";
import { AboutFounder } from "@/components/home/AboutFounder";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Moisés Castillo, Head of Americas Operations at FastForm Americas — sourcing industrial metal 3D printers straight from the manufacturer for businesses across the Americas.",
};

export default function AboutPage() {
  return <AboutFounder />;
}
