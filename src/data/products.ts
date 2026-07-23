import type { Category, Product } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ENVISHON — PRODUCT CATALOG
 * ─────────────────────────────────────────────────────────────────────────
 *  Single source of truth for every printer on the site. No database — edit
 *  this file to update the storefront.
 *
 *  Current lineup: 5 SLM (metal) printers, filtered in the shop by use-case
 *  segment (Desktop / Dental / Industrial).
 *
 *  TO EDIT A PRODUCT:   change name / price / specLine / description / specs.
 *                       keep `slug` unique + URL-safe (it becomes the URL).
 *  TO ADD AN IMAGE:     drop a file in /public/products/ and add its path to
 *                       `images` (e.g. "/products/en-m220.jpg").
 *  TO FEATURE ON HOME:  set `featured: true` (homepage shows up to 4).
 *  ─────────────────────────────────────────────────────────────────────────
 */

export const CATEGORIES: Category[] = [
  "Desktop",
  "Dental",
  "Industrial",
  "Thermal",
];

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  MANUFACTURER COMPLIANCE — shared by the SLM printer line.
 * ─────────────────────────────────────────────────────────────────────────
 *  These are the FACTORY's certifications, not FastForm's, and the wording is
 *  deliberately attributed that way. Do NOT reword this to imply FastForm
 *  holds them, and do NOT add the CE / FDA / ISO marks as images — the FDA
 *  logo may not be used by private companies at all.
 *
 *  Sourced from the FASTFORM 2026 catalog's own claim. Still to obtain from
 *  the supplier before this can carry certificate numbers:
 *    1. CE Declaration of Conformity (per model)
 *    2. FDA accession number for the laser product report (21 CFR 1040.10)
 *    3. ISO 9001 certificate — number, issuing body, expiry
 *  Note: the accession number is also needed on FDA Form 2877 at import.
 *  See Products/New Catalog/CHANGES-vs-current-site.md.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const PRINTER_COMPLIANCE =
  "Manufactured in an ISO 9001-certified facility, CE marked, and built to the FDA laser-safety standard (21 CFR 1040.10). Compliance documentation is supplied with every install.";

/** Human-readable copy for each category badge / filter. */
export const CATEGORY_META: Record<
  Category,
  { label: string; blurb: string }
> = {
  Desktop: {
    label: "Desktop",
    blurb:
      "Compact, all-in-one SLM systems — in-house metal printing without the floor space.",
  },
  Dental: {
    label: "Dental",
    blurb:
      "Precision SLM metal printers tuned for crowns, frameworks, and dental labs.",
  },
  Industrial: {
    label: "Industrial",
    blurb:
      "Large- and super-large-format SLM for molds, tooling, and serious mass production.",
  },
  Thermal: {
    label: "Thermal",
    blurb:
      "Green-laser copper printing — liquid cooling, cold plates, and heat exchangers you can't cast or machine.",
  },
  "Powder Production": {
    label: "Powder Production",
    blurb:
      "Atomizers that turn precious metal into your own print-ready powder — close the loop on feedstock.",
  },
  Design: {
    label: "Design",
    blurb:
      "A dedicated 3D designer on your team — turn ideas into print-ready parts.",
  },
  AI: {
    label: "AI",
    blurb:
      "AI integration, automations, agents & websites — built to move your business years ahead.",
  },
  SLS: {
    label: "SLS",
    blurb:
      "Selective Laser Sintering — strong, support-free nylon and composite parts.",
  },
  Resin: {
    label: "Resin",
    blurb: "SLA / DLP resin — ultra-fine detail and smooth surface finish.",
  },
  "Large-Format FDM": {
    label: "Large-Format FDM",
    blurb: "Industrial FDM at large build volumes for tooling and prototypes.",
  },
};

export const products: Product[] = [
  {
    slug: "deskfab-x1",
    name: "DeskFab X1",
    category: "Desktop",
    specLine: "Ø100 × 70 mm build · 300 W fiber laser · CoCr & titanium",
    priceCents: 4_400_000,
    inquiryOnly: true,
    description:
      "An all-in-one true desktop SLM metal printer built for dental labs and small-batch metal work. Compact 0.39 m² footprint, AI one-click printing, and a maintenance-free permanent filter make it the easiest entry point into in-house metal additive manufacturing.",
    highlights: [
      "All-in-one integrated desktop design — 600×650×800 mm, only 0.39 m² floor space",
      "Permanent filter: 30,000-hour service life, maintenance-free, tool-free, zero install errors",
      "One-click AI printing — scan to design in ~5 minutes",
      "Multi-material modular cartridge: CoCr, Ti and more, switchable",
      "Hassle-free install with 4-color coded, mistake-proof conduits",
      "Exclusive LFPT (Laser Follow Powder Technology) boosts efficiency ~20%",
    ],
    compliance: PRINTER_COMPLIANCE,
    specs: [
      { label: "Process", value: "SLM (Selective Laser Melting)" },
      { label: "Printer Model", value: "DeskFab X1" },
      { label: "Dimensions", value: "615 × 655 × 850 mm (L×W×H)" },
      { label: "Weight", value: "140 kg" },
      { label: "Building Size", value: "Ø100 × 70 mm" },
      { label: "Spot Size", value: "20–80 µm" },
      { label: "Laser Power", value: "Single laser, 300 W" },
      { label: "Laser Type", value: "CW Fiber Laser" },
      { label: "Rated Power", value: "1 kW" },
      { label: "Min. Oxygen", value: "≤100 ppm" },
      { label: "Scan Speed", value: "0–7 m/s" },
      { label: "Layer Thickness", value: "20–80 µm (adjustable)" },
      { label: "Recoater Type", value: "Flexible soft blade" },
      {
        label: "Powder Feeding Type",
        value: "Top powder feeding, one-way recoating",
      },
      { label: "Printing Accuracy", value: "±0.05 mm (L≤100 mm)" },
      { label: "Powder Capacity", value: "1.5 L" },
      { label: "Power Failure", value: "Auto Resume" },
      { label: "Baseplate Fixing", value: "Quick-release magnetic fixed" },
      {
        label: "Layout Method",
        value: "Fully automatic layout and path planning",
      },
      { label: "Filtration", value: "Permanent filter ≥ 30,000 hours" },
      {
        label: "Printable Materials",
        value: "Cobalt-chromium alloy, titanium alloy, pure titanium",
      },
      { label: "Software", value: "FastForm slicing & control software" },
      { label: "Cooling", value: "Water-cooled" },
      { label: "Power Input", value: "220 V AC single phase, ~1 kW avg" },
      { label: "Protective Gas", value: "Nitrogen, Argon" },
    ],
    images: ["/products/ff-desk.jpg"],
    printedParts: ["/products/ff-desk-part-1.jpg", "/products/ff-desk-part-2.jpg"],
    datasheet: "/docs/en-desk.pdf",
    quotePdf: "/quotes/en-desk-quote.pdf",
    featured: true,
  },
  {
    slug: "ff-m140",
    name: "FF-M140",
    category: "Dental",
    specLine: "Ø140 × 170 mm build · 500 W laser · ~150 teeth per run",
    priceCents: 9_900_000,
    inquiryOnly: true,
    description:
      "A specialized single-laser SLM dental metal printer with a Ø140 mm build and one-click dental typesetting. Built for precise, customized dental components with high throughput.",
    highlights: [
      "Stable optical system with one-click dental typesetting",
      "Fast building — ~150 teeth per shot",
      "No-filter-cartridge waste, high powder utilization",
      "Complete typesetting and data processing in ~5 minutes",
      "Camera-equipped for safe remote monitoring",
      "Control software supports up to 36-galvanometer multi-laser splicing",
    ],
    compliance: PRINTER_COMPLIANCE,
    specs: [
      { label: "Process", value: "SLM (Selective Laser Melting)" },
      { label: "Product Model", value: "FF-M140" },
      { label: "Print Volume", value: "Ø140 mm × H100 mm / Ø140 mm × H170 mm" },
      { label: "Dimension", value: "970 × 815 × 1750 mm (L×W×H)" },
      { label: "Machine Weight", value: "450 kg" },
      { label: "Beam Size", value: "50–100 µm (adjustable)" },
      { label: "Powder Layer Thickness", value: "20–120 µm (adjustable)" },
      { label: "Recoater Type", value: "Flexible soft blade" },
      { label: "Number of Lasers", value: "Single laser" },
      { label: "Laser Power", value: "Single laser, 1 × 500 W" },
      { label: "Rated Power", value: "1.5 kW" },
      { label: "Power Supply", value: "Single phase 220 V, ~1.5 kW" },
      { label: "Protective Gas", value: "Nitrogen, Argon" },
      { label: "Min. Oxygen", value: "≤100 ppm" },
      { label: "Cooling", value: "Water cooling" },
      {
        label: "Baseplate Installation",
        value: "Magnetic fixed / screw fixed",
      },
      { label: "Powder Spreading", value: "Top feeding, one-way recoating" },
      { label: "Scan Speed", value: "0–10 m/s" },
      {
        label: "Accuracy",
        value: "±0.1 mm (L≤100 mm); ±0.1%×L (L>100 mm)",
      },
      {
        label: "Layout Method",
        value: "Fully automatic layout and path planning",
      },
      { label: "Max Powder / Charge", value: "3 L" },
      { label: "Power-Failure Resume", value: "Yes" },
      { label: "Auto Shutdown", value: "Yes" },
      {
        label: "Printing Materials",
        value:
          "Stainless steel, titanium alloy, tool steel, high-entropy alloy, cobalt alloy, aluminum alloy, copper alloy, etc.",
      },
      { label: "Filtration Lifetime", value: "Permanent filter ≥ 30,000 hours" },
      { label: "Software", value: "FastForm slicing & control software" },
      { label: "Warranty", value: "1 year" },
      { label: "Connection", value: "WiFi" },
      { label: "Production Capacity", value: "2000 pcs/year" },
    ],
    images: ["/products/ff-m140.jpg"],
    printedParts: ["/products/ff-m140-part-1.jpg", "/products/ff-m140-part-2.jpg"],
    quotePdf: "/quotes/en-m140-quote.pdf",
  },
  {
    slug: "ff-m220",
    name: "FF-M220",
    category: "Dental",
    specLine: "220 × 140 × 100 mm · dual 500 W lasers · 300 crowns/run",
    priceCents: 14_900_000,
    inquiryOnly: true,
    description:
      "A dual-laser SLM metal printer with a large build volume — print up to 300 crowns or 30 frameworks in a single run. Permanent filter, LFPT efficiency tech, and free-forever in-house software.",
    highlights: [
      "Dual-laser, large build — 220×140×100 mm (up to H200 mm); 300 crowns or 30 frameworks per run",
      "Permanent filter: 30,000-hour lifetime, zero replacement cost",
      "LFPT cuts single-layer powder time by 9 s (~20% efficiency gain)",
      "One-click layout (5 min) and one-click printing; software free forever",
      "Cost-price core components and 24-hour technical support",
    ],
    compliance: PRINTER_COMPLIANCE,
    specs: [
      { label: "Process", value: "SLM (Selective Laser Melting), dual-laser" },
      { label: "Product Model", value: "FF-M220" },
      { label: "Printing Size", value: "220 × 140 × 100/220 mm (L×W×H)" },
      { label: "Beam Size", value: "60–100 µm (adjustable)" },
      { label: "Powder Layer Thickness", value: "20–150 µm (adjustable)" },
      { label: "Recoater Type", value: "Flexible soft blade" },
      { label: "Number of Lasers", value: "Dual lasers" },
      { label: "Laser Power", value: "Dual lasers, 2 × 500 W" },
      { label: "Rated Power", value: "2 kW" },
      { label: "Power Supply", value: "AC 220 V ±10% / 50 Hz, 2 kW" },
      { label: "Protective Gas", value: "Nitrogen, Argon" },
      { label: "Min. Oxygen", value: "≤100 ppm" },
      { label: "Cooling", value: "Water cooling" },
      {
        label: "Baseplate Installation",
        value: "Magnetic fixed / screw fixed",
      },
      { label: "Powder Spreading", value: "Top-down powder feeding" },
      { label: "Scan Speed", value: "0–10 m/s" },
      {
        label: "Accuracy",
        value: "±0.1 mm (L≤100 mm); ±0.1%×L (L>100 mm)",
      },
      {
        label: "Layout Method",
        value: "Fully automatic layout and path planning",
      },
      { label: "Filtration Lifetime", value: "Permanent filter ≥ 30,000 hours" },
      {
        label: "Printing Materials",
        value:
          "Stainless steel, titanium alloy, tool steel, high-entropy alloy, CoCr alloy, aluminum alloy, copper alloy, etc.",
      },
      { label: "Printer Dimension", value: "1200 × 750 × 1820 mm (L×W×H)" },
      { label: "Max Powder Addition", value: "7 L" },
      { label: "Machine Weight", value: "550 kg" },
      { label: "Software", value: "FastForm slicing & control software" },
    ],
    images: ["/products/ff-m220.jpg"],
    printedParts: ["/products/ff-m220-part-1.jpg", "/products/ff-m220-part-2.jpg"],
    quotePdf: "/quotes/en-m220-quote.pdf",
    featured: true,
  },
  {
    slug: "ff-m300",
    name: "FF-M300",
    category: "Industrial",
    specLine: "300 × 300 × 400 mm build · 2–4 × 500 W lasers · 100 cm³/h",
    priceCents: 34_900_000,
    inquiryOnly: true,
    description:
      "A large-format SLM metal printer for industrial molds, tooling and high-volume dental work. Bidirectional powder spreading and one-click typesetting for fast, stable mass production.",
    highlights: [
      "Stable optical system with one-click typesetting",
      "Fast building — ~300 teeth / 5 hours, 30 supports / 6 hours",
      "Bidirectional powder spreading, high powder utilization",
      "Complete typesetting and data processing in ~5 minutes",
      "Camera remote monitoring; strong stability and easy install",
      "CE certified; used in aerospace, automotive, medical and education",
    ],
    compliance: PRINTER_COMPLIANCE,
    specs: [
      { label: "Model No.", value: "FF-M300" },
      { label: "Forming Technology", value: "SLM (Selective Laser Melting)" },
      { label: "Building Volume", value: "300 × 300 × 400 mm (L×W×H)" },
      { label: "Dimensions", value: "1960 × 930 × 2222 mm (L×W×H)" },
      { label: "Machine Weight", value: "1230 kg / 1260 kg" },
      { label: "Laser Power", value: "2 or 4 lasers (optional), 1 × 500 W" },
      { label: "Scanning Speed", value: "10 m/s (max)" },
      { label: "Rated Power", value: "4 kW / 6 kW" },
      { label: "Forming Rate", value: "100 cm³/h (max)" },
      { label: "Optical System", value: "F-theta lens" },
      { label: "Recoater Type", value: "Flexible soft blade" },
      {
        label: "Recoating Type",
        value: "Top powder feeding, bidirectional recoating",
      },
      { label: "Protective Gas", value: "Nitrogen, Argon ≤ 2 L/min" },
      { label: "Filtration System", value: "Permanent filter ≥ 30,000 hours" },
      {
        label: "Printing Materials",
        value:
          "Tool steel, stainless steel, titanium alloy, superalloy, aluminum alloy, etc.",
      },
      { label: "Software", value: "FastForm slicing & control software" },
      { label: "Operating System", value: "Windows 10" },
      { label: "File Formats", value: "STEP, IGES, SLC, CLI, STL" },
      { label: "Nozzle Number", value: "1" },
      { label: "Connection", value: "WiFi" },
      { label: "Warranty", value: "One Year" },
      { label: "Production Capacity", value: "2000 pcs/year" },
    ],
    images: ["/products/ff-m300.jpg"],
    printedParts: ["/products/ff-m300-part-1.jpg", "/products/ff-m300-part-2.jpg"],
    quotePdf: "/quotes/en-m300-quote.pdf",
    featured: true,
  },
  {
    slug: "ff-m420",
    name: "FF-M420",
    category: "Industrial",
    specLine: "420 × 420 mm build · multi-laser SLM · 240 cm³/h forming rate",
    priceCents: 62_900_000,
    inquiryOnly: true,
    description:
      "The flagship super-large-format multi-laser SLM metal printer, built for serious mass production with a powder circulation system for high-volume runs.",
    highlights: [
      "Super-large multi-laser build for mass production",
      "Powder circulation system to facilitate high-volume runs",
      "No filter-cartridge waste, reduced powder usage",
      "Typesetting and data processing within ~5 minutes",
      "Bidirectional powder spreading for speed",
      "Camera remote monitoring for safe, hands-off operation",
      "CE certified",
    ],
    compliance: PRINTER_COMPLIANCE,
    specs: [
      { label: "Model No.", value: "FF-M420" },
      {
        label: "Forming Technology",
        value: "SLM (Selective Laser Melting), multi-laser",
      },
      // NOTE: "Building Volume" and "Laser Power" are intentionally absent —
      // the 2026 catalog (420×420×450 mm; 4 or 8 lasers) conflicts with the
      // quote we issue (H400 mm; fixed quad-laser). Awaiting supplier
      // confirmation — see Products/New Catalog/CHANGES-vs-current-site.md.
      { label: "Dimensions", value: "2753 × 1150 × 2340 mm (L×W×H)" },
      { label: "Machine Weight", value: "2000 kg" },
      { label: "Rated Power", value: "10 kW" },
      { label: "Scanning Speed", value: "10 m/s (max)" },
      { label: "Forming Rate", value: "240 cm³/h (max)" },
      {
        label: "Galvo Type",
        value: "Raster-type high-precision digital encoding lens",
      },
      { label: "Recoater Type", value: "Flexible soft blade" },
      {
        label: "Recoating Type",
        value: "Top powder feeding, bidirectional recoating",
      },
      { label: "Protective Gas", value: "Nitrogen, Argon" },
      { label: "Filtration Lifetime", value: "Permanent filter ≥ 30,000 hours" },
      {
        label: "Printing Materials",
        value:
          "Tool steel, stainless steel, titanium alloy, superalloy, aluminum alloy, etc.",
      },
      { label: "Software", value: "FastForm slicing & control software" },
      { label: "Operating System", value: "Windows 10" },
      { label: "File Formats", value: "STEP, IGES, SLC, CLI, STL" },
      { label: "Nozzle Number", value: "1" },
      { label: "Connection", value: "WiFi" },
      { label: "Warranty", value: "One Year" },
      { label: "Production Capacity", value: "2000 pcs/year" },
    ],
    images: ["/products/ff-m420.jpg"],
    printedParts: ["/products/ff-m420-part-1.jpg", "/products/ff-m420-part-2.jpg"],
    quotePdf: "/quotes/en-m420-quote.pdf",
    featured: true,
  },
  {
    slug: "ff-m800",
    name: "FF-M800",
    category: "Industrial",
    specLine: "Super-large multi-laser SLM · 4 lasers · industrial mass production",
    priceCents: 250_000_000,
    inquiryOnly: true,
    description:
      "Our most industrial machine. The FF-M800 is a super-large-format, multi-laser SLM system built for serious production — four lasers paired with a dual vibrating-mirror system, bidirectional variable-speed powder feeding, and Z-axis closed-loop control all working together to melt large metal parts fast and repeatably. Print across stainless steel, tool steel, nickel, aluminum, and titanium alloys at a layer resolution down to 150 µm and precision under 100 µm. When your throughput outgrows everything else in the lineup, this is the floor-standing workhorse that keeps up — backed by Americas-wide support from install onward.",
    highlights: [
      "Our most industrial system — super-large-format, multi-laser SLM for serious production",
      "4 lasers with a dual vibrating-mirror system for high-throughput melting",
      "Bidirectional, variable-speed powder feeding for faster builds",
      "Z-axis closed-loop control for consistent, repeatable layers",
      "Stainless, tool steel, nickel, aluminum & titanium alloys — under 100 µm precision",
      "Efficient filter cartridge and air management; data processing in ~5 minutes",
    ],
    compliance: PRINTER_COMPLIANCE,
    specs: [
      { label: "Model No.", value: "FF-M800" },
      {
        label: "Forming Technology",
        value: "SLM (Selective Laser Melting), multi-laser",
      },
      // NOTE: "Number of Lasers" is held at the current value — the 2026
      // catalog says 6 or 8 (optional), 1 × 500 W. Awaiting supplier
      // confirmation — see Products/New Catalog/CHANGES-vs-current-site.md.
      { label: "Number of Lasers", value: "4 (multi-laser)" },
      { label: "Building Volume", value: "650 × 650 × 1100 mm (L×W×H)" },
      { label: "Dimensions", value: "6600 × 4050 × 5800 mm (L×W×H)" },
      { label: "Machine Weight", value: "6000 kg" },
      { label: "Rated Power", value: "20 kW" },
      { label: "Scanning Speed", value: "10 m/s (max)" },
      { label: "Forming Rate", value: "240 cm³/h (max)" },
      { label: "Preheating Temperature", value: "200 °C" },
      {
        label: "Galvo Type",
        value: "Raster-type high-precision digital encoding lens",
      },
      {
        label: "Recoating Type",
        value: "Top powder feeding, bidirectional recoating",
      },
      { label: "Powder Feeding", value: "Bidirectional, variable-speed" },
      { label: "Motion Control", value: "Z-axis closed-loop" },
      { label: "Protective Gas", value: "Nitrogen, Argon" },
      { label: "Filtration Lifetime", value: "Permanent filter ≥ 30,000 hours" },
      {
        label: "Printing Materials",
        value:
          "Tool steel, stainless steel, titanium alloy, superalloy, aluminum alloy, etc.",
      },
      { label: "Software", value: "FastForm slicing & control software" },
      { label: "Warranty", value: "One Year" },
    ],
    images: ["/products/ff-m800.jpg"],
    printedParts: ["/products/ff-m800-part-1.jpg", "/products/ff-m800-part-2.jpg"],
    quotePdf: "/quotes/en-m800-quote.pdf",
  },

  {
    slug: "aiform-g1",
    name: "AiForm-G1",
    category: "Thermal",
    specLine: "140 × 140 × 180 mm build · 500 W green laser · copper & thermal parts",
    priceCents: null,
    inquiryOnly: true,
    description:
      "A green-laser system built for one job most metal printers cannot do: copper. Copper reflects the infrared light conventional fiber lasers use, which is why it is so difficult to print well. The AiForm-G1 runs a single-mode green fiber laser that copper actually absorbs — so you get dense, fully-fused parts instead of porous ones. That unlocks the geometry thermal engineers have always wanted but could never cast or machine: internal lattice cold plates, conformal liquid-cooling channels, and heat exchangers with walls down to 0.1 mm. With a 15–40 µm beam and scene-intelligent focusing, it holds micro-level detail across the whole build. Aimed squarely at data-center liquid cooling, power electronics, and aerospace thermal management — and, like every FastForm machine, it runs FastForm and is supported by our Americas team.",
    highlights: [
      "Green fiber laser — prints copper properly, where infrared lasers struggle with reflectivity",
      "\"Zero-penetration\" ultra-high-density forming — dense parts, not porous ones",
      "Micro-level precision — 15–40 µm beam, minimum wall thickness 0.1 mm",
      "Built for liquid cooling — lattice cold plates, conformal channels, heat exchangers",
      "Scene intelligent focusing holds detail across the full build area",
      "Permanent filter — 0 cost, 0 replacement, 0 risk",
      "Runs FastForm slicing & control, like the rest of the lineup",
    ],
    compliance: PRINTER_COMPLIANCE,
    specs: [
      { label: "Process", value: "SLM (Selective Laser Melting)" },
      { label: "Printer Model", value: "AiForm-G1" },
      { label: "Build Size", value: "140 × 140 × 180 mm (L×W×H)" },
      { label: "Laser Source", value: "Single-mode green fiber laser, 500 W" },
      { label: "Beam Diameter", value: "15–40 µm" },
      { label: "Layer Thickness", value: "20–120 µm" },
      { label: "Printing Accuracy", value: "Min. wall thickness 0.1 mm" },
      { label: "Focus System", value: "Scene intelligent focusing" },
      { label: "Scanning Speed", value: "7 m/s (max)" },
      { label: "Computing Power", value: "TFLOPS" },
      { label: "Dimensions", value: "1770 × 810 × 1750 mm (L×W×H)" },
      { label: "Filtration", value: "Permanent filter — 0 cost, 0 replacement" },
      { label: "Software", value: "FastForm slicing & control suite" },
      {
        label: "Printable Materials",
        value: "Copper and copper alloys; high-reflectivity metals",
      },
      {
        label: "Applications",
        value:
          "Thermal management, power electronics, industrial manufacturing, aerospace",
      },
    ],
    images: ["/products/ff-g1.jpg"],
    printedParts: ["/products/ff-g1-part-1.jpg"],
    featured: true,
  },

];

/** Format a price in cents as USD, e.g. 5900000 → "$59,000". */
export function formatPrice(priceCents: number | null): string {
  if (priceCents == null) return "Contact for pricing";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

/** Look up a single product by its slug. Returns undefined if not found. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Buyable / available products (excludes coming-soon placeholders). */
export function getAvailableProducts(): Product[] {
  return products.filter((p) => !p.comingSoon);
}

/** Upcoming inventory placeholders. */
export function getComingSoonProducts(): Product[] {
  return products.filter((p) => p.comingSoon);
}

/** Products flagged for the homepage featured grid (never coming-soon). */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && !p.comingSoon);
}
