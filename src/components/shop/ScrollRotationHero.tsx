"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SHOP — SCROLL-SCRUBBED ROTATION HERO
 * ─────────────────────────────────────────────────────────────────────────
 *  The FastForm lineup performs a half-rotation as you scroll (29-frame image
 *  sequence drawn to a <canvas> — pre-decoded frames give frame-accurate,
 *  jank-free control where video seeking stutters).
 *
 *  Composition, all pinned in a sticky viewport:
 *    · a faint Americas map watermark fills the backdrop
 *    · the FastForm Americas logo sits centered above the machines and fades
 *      out as you scroll (gone by the time the sequence ends)
 *    · the headline starts at the bottom and slides up above the machines,
 *      fading over the final frames
 *  The section is shorter on mobile so the catalog arrives sooner. Frames draw
 *  "contain" on white so nothing is cropped. Honors prefers-reduced-motion.
 * ─────────────────────────────────────────────────────────────────────────
 */

const FRAME_COUNT = 29;
// Transparent cutouts (white background removed) so the machines float over the
// map/grid backdrop. Swap `.webp` → `.jpg` to restore the white-background set.
const framePath = (i: number) =>
  `/shop-rotation/frame-${String(i + 1).padStart(2, "0")}.webp`;

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function ScrollRotationHero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(0);

  /** Draw the current frame, contain-fit + DPR-scaled. Reads refs only. */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameRef.current];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (cw === 0 || ch === 0) return;
    if (
      canvas.width !== Math.round(cw * dpr) ||
      canvas.height !== Math.round(ch * dpr)
    ) {
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }, []);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw();
    });
  }, [draw]);

  /** Position overlays for a given scroll progress (0→1). */
  const applyOverlays = useCallback((p: number) => {
    const text = textRef.current;
    if (text) {
      const travel = window.innerHeight * 0.68; // bottom → above the machines
      const fade = p < 0.72 ? 1 : clamp(1 - (p - 0.72) / 0.28, 0, 1);
      text.style.transform = `translate3d(0, ${(-p * travel).toFixed(1)}px, 0)`;
      text.style.opacity = fade.toFixed(3);
    }
    const logo = logoRef.current;
    if (logo) logo.style.opacity = clamp(1 - p / 0.85, 0, 1).toFixed(3);
    const cue = cueRef.current;
    if (cue) cue.style.opacity = clamp(1 - p * 6, 0, 1).toFixed(3);
  }, []);

  // Preload every frame. Handlers attached BEFORE src + already-complete
  // handling, so the first draw never gets lost to an early-finishing load.
  useEffect(() => {
    let mounted = true;
    let count = 0;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = imgs;

    const onFrameReady = (i: number) => {
      if (!mounted) return;
      count += 1;
      setLoaded(count);
      if (i === frameRef.current) scheduleDraw();
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => onFrameReady(i);
      img.onerror = () => onFrameReady(i);
      img.src = framePath(i);
      imgs[i] = img;
      if (img.complete && img.naturalWidth > 0) onFrameReady(i);
    }
    return () => {
      mounted = false;
    };
  }, [scheduleDraw]);

  // Redraw whenever the canvas gets/changes a real size.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => scheduleDraw());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [scheduleDraw]);

  // Map scroll position → frame index + overlay motion.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      frameRef.current = Math.floor(FRAME_COUNT / 2);
      applyOverlays(0);
      scheduleDraw();
      return;
    }

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const scrubRange = section.offsetHeight - window.innerHeight;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = scrubRange > 0 ? clamp(scrolled / scrubRange, 0, 1) : 0;
      applyOverlays(progress);
      const frame = Math.round(progress * (FRAME_COUNT - 1));
      if (frame !== frameRef.current) {
        frameRef.current = frame;
        scheduleDraw();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    scheduleDraw();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scheduleDraw, applyOverlays]);

  const pct = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-16 h-[135vh] w-full sm:h-[175vh]"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden bg-base">
        {/* ambient depth */}
        <div className="pointer-events-none absolute inset-0 bg-violet-mesh opacity-60" />
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-50" />

        {/* Americas map watermark */}
        <Image
          src="/brand/americas-map.png"
          alt=""
          aria-hidden="true"
          width={844}
          height={1500}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[96%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.22]"
        />

        {/* the rotating lineup */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 h-full w-full"
          aria-label="The FastForm metal 3D printer lineup, rotating"
          role="img"
        />

        {/* FastForm Americas logo — centered above the machines, fades on scroll */}
        <div
          ref={logoRef}
          className="pointer-events-none absolute left-1/2 top-[10%] z-20 w-44 -translate-x-1/2 will-change-[opacity] sm:top-[12%] sm:w-72"
        >
          <Image
            src="/brand/fastform-americas-logo.png"
            alt="FastForm Americas"
            width={900}
            height={219}
            priority
            className="h-auto w-full"
          />
        </div>

        {/* top preload bar — fades out once frames are in */}
        <div
          className={`absolute inset-x-0 top-0 z-30 h-0.5 bg-accent/70 transition-opacity duration-500 ${
            loaded >= FRAME_COUNT ? "opacity-0" : "opacity-100"
          }`}
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />

        {/* headline — starts at the bottom, slides up + fades as you scroll */}
        <div
          ref={textRef}
          className="absolute inset-x-0 bottom-0 z-20 will-change-transform"
        >
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <p className="kicker mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
              {t("shopHero.line")}
            </p>
            <h1 className="font-heading text-4xl font-medium tracking-tight text-titanium text-balance sm:text-6xl">
              {t("shopHero.title")}
            </h1>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite sm:text-xs">
              {t("shopHero.spec")}
            </p>
          </div>
        </div>

        {/* scroll cue */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 animate-float text-graphite motion-reduce:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 4v16M6 14l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
