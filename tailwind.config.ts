import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand palette (FastForm Americas — light corporate) ─────
        // Light/white surfaces · slate greys · FastForm blue accent.
        // Sampled brand blue from the 2026 catalog logo = #244B96.
        base: {
          DEFAULT: "#FFFFFF", // page canvas (also = text color on blue buttons)
          900: "#F6F8FB", // faint off-white section
          800: "#EEF2F7", // light surface / card
          700: "#E3E9F1", // raised surface / hairline fill
          600: "#D4DDEA", // strong divider / border
        },
        graphite: "#67768C", // muted text, captions, dividers
        steel: "#43526B", // body text on light
        titanium: "#0E2036", // deep navy — headings + primary ink
        accent: {
          DEFAULT: "#244B96", // FastForm Blue — primary accent (links, buttons)
          signal: "#2E63C8", // brighter blue — gradient end, hover
          ember: "#5A86D6", // light blue — tints, highlights, subtle glows
        },
      },
      fontFamily: {
        // Bricolage Grotesque — editorial display for headings.
        heading: ["var(--font-heading)", "sans-serif"],
        // Geist Sans — clean, neutral body.
        body: ["var(--font-geist-sans)", "sans-serif"],
        // Geist Mono — spec readouts, data, and the technical "HUD" flavor.
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "steel-sheen":
          "linear-gradient(135deg, rgba(36,75,150,0.10) 0%, rgba(36,75,150,0.03) 40%, rgba(255,255,255,0) 70%)",
        "accent-sheen":
          "linear-gradient(135deg, rgba(46,99,200,0.14) 0%, rgba(36,75,150,0.05) 45%, rgba(255,255,255,0) 72%)",
        "grid-faint":
          "linear-gradient(rgba(14,32,54,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14,32,54,0.05) 1px, transparent 1px)",
        // Ambient blue mesh — used behind hero/CTA for depth, not a flat fade.
        "violet-mesh":
          "radial-gradient(60% 55% at 82% 20%, rgba(46,99,200,0.14) 0%, rgba(255,255,255,0) 60%), radial-gradient(50% 50% at 8% 90%, rgba(36,75,150,0.10) 0%, rgba(255,255,255,0) 55%)",
      },
      boxShadow: {
        // Subtle blue glow — "the glow, never the surface". Use sparingly.
        accent:
          "0 0 0 1px rgba(36,75,150,0.30), 0 8px 30px -8px rgba(36,75,150,0.28)",
        // Soft neutral depth shadow for the light canvas.
        depth: "0 24px 60px -24px rgba(15,30,54,0.18)",
        "depth-lg": "0 40px 90px -30px rgba(15,30,54,0.22)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Slow drift for ambient glow orbs.
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-24px,0)" },
        },
        // Sweeping laser line across the hero readout.
        scanline: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "12%": { opacity: "0.9" },
          "88%": { opacity: "0.9" },
          "100%": { transform: "translateY(1200%)", opacity: "0" },
        },
        // Pulsing status dot.
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(36,75,150,0.5)" },
          "70%": { boxShadow: "0 0 0 7px rgba(36,75,150,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(36,75,150,0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },

        /* ── Vizus AI concept-mockup motion ─────────────────────────── */

        // Annotation strokes drawing themselves in, holding, then clearing.
        "vz-draw": {
          "0%": { strokeDashoffset: "260" },
          "22%, 74%": { strokeDashoffset: "0" },
          "92%, 100%": { strokeDashoffset: "260" },
        },
        // Caret blink for the prompt bar.
        "vz-caret": {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Prompt text typing itself out, holding, then resetting.
        "vz-type": {
          "0%": { width: "0%" },
          "35%, 80%": { width: "100%" },
          "97%, 100%": { width: "0%" },
        },
        // The part gently breathing so the viewport never feels frozen.
        "vz-hover": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-7px,0)" },
        },
        // Geometry resolving: wireframe -> solid, on a loop.
        "vz-resolve": {
          "0%, 12%": { opacity: "0", transform: "scale(0.965)" },
          "38%, 82%": { opacity: "1", transform: "scale(1)" },
          "97%, 100%": { opacity: "0", transform: "scale(0.965)" },
        },
        // Inverse of vz-resolve — the wireframe that fades as the solid lands.
        "vz-wire": {
          "0%, 12%": { opacity: "0.85" },
          "38%, 82%": { opacity: "0.12" },
          "97%, 100%": { opacity: "0.85" },
        },
        // Lattice cells populating as the prompt resolves.
        "vz-lattice": {
          "0%, 20%": { opacity: "0" },
          "45%, 85%": { opacity: "0.75" },
          "98%, 100%": { opacity: "0" },
        },
        // Reference image landing in the drop zone.
        "vz-drop": {
          "0%, 8%": { opacity: "0", transform: "translateY(-10px) scale(0.94)" },
          "28%, 88%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "99%, 100%": { opacity: "0", transform: "translateY(-10px) scale(0.94)" },
        },
        // Prompt-history chip handing off to the next one.
        "vz-step": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        // Soft sweep across a viewport as geometry rebuilds.
        "vz-sweep": {
          "0%": { transform: "translateX(-120%)", opacity: "0" },
          "20%, 60%": { opacity: "0.5" },
          "100%": { transform: "translateX(120%)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2.4s linear infinite",
        float: "float 9s ease-in-out infinite",
        scanline: "scanline 4.5s cubic-bezier(0.4,0,0.2,1) infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 32s linear infinite",

        // Vizus AI mockups — one shared 9s cycle so panels feel synchronised.
        "vz-draw": "vz-draw 9s ease-in-out infinite",
        "vz-caret": "vz-caret 1.1s step-end infinite",
        "vz-type": "vz-type 9s steps(34, end) infinite",
        "vz-hover": "vz-hover 6s ease-in-out infinite",
        "vz-resolve": "vz-resolve 9s cubic-bezier(0.16,1,0.3,1) infinite",
        "vz-wire": "vz-wire 9s cubic-bezier(0.16,1,0.3,1) infinite",
        "vz-lattice": "vz-lattice 9s ease-in-out infinite",
        "vz-drop": "vz-drop 9s cubic-bezier(0.16,1,0.3,1) infinite",
        "vz-step": "vz-step 9s ease-in-out infinite",
        "vz-sweep": "vz-sweep 9s cubic-bezier(0.4,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
