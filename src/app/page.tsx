import { HeaderSequence } from "@/components/home/HeaderSequence";
import { AmericasSection } from "@/components/home/AmericasSection";
import { TelemetryStrip } from "@/components/home/TelemetryStrip";
import { FilmBand } from "@/components/home/FilmBand";
import { WhySection } from "@/components/home/WhySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutFounder } from "@/components/home/AboutFounder";
import { CtaBand } from "@/components/home/CtaBand";
import { ProgressRail } from "@/components/ui/ProgressRail";

// Section index for the sticky rail — ids live on the wrappers below.
const RAIL = [
  { id: "overview", label: "rail.overview" },
  { id: "film", label: "rail.film" },
  { id: "why", label: "rail.why" },
  { id: "machines", label: "rail.machines" },
  { id: "about", label: "rail.about" },
  { id: "contact-cta", label: "rail.contact" },
];

export default function HomePage() {
  return (
    <>
      <ProgressRail sections={RAIL} />

      <div id="overview">
        <HeaderSequence />
        <AmericasSection />
        <TelemetryStrip />
      </div>
      <div id="film">
        <FilmBand />
      </div>
      <div id="why">
        <WhySection />
      </div>
      <div id="machines">
        <FeaturedProducts />
      </div>
      <div id="about">
        <AboutFounder />
      </div>
      <div id="contact-cta" className="pb-8 pt-6 sm:pb-16 sm:pt-10">
        <CtaBand />
      </div>
    </>
  );
}
