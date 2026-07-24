"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  HOME — SCROLL-SCRUBBED HEADER SEQUENCE
 * ─────────────────────────────────────────────────────────────────────────
 *  A cinematic intro: frames that zoom into the FastForm Americas machine and
 *  dissolve to solid blue, scrubbed by scroll.
 *
 *  Fit: COVER on landscape (desktop) so it fills edge to edge; CONTAIN on
 *  portrait (mobile) so the whole machine fits the 9:16 screen. On mobile the
 *  letterbox backdrop stays white and then eases smoothly into the final blue
 *  as you scroll — flowing seamlessly into the <AmericasSection> below.
 * ─────────────────────────────────────────────────────────────────────────
 */

const FRAME_COUNT = 70;
/** Solid blue the sequence ends on — kept in sync with <AmericasSection>. */
export const SEQUENCE_END_BLUE = "#2c4a86";
const END_RGB = [44, 74, 134]; // #2c4a86
const framePath = (i: number) =>
  `/header-rotation/frame-${String(i + 1).padStart(2, "0")}.jpg`;

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/** Smooth 0→1 ramp between edges a and b. */
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function HeaderSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(0);

  /** Draw the current frame — COVER on landscape, CONTAIN on portrait. */
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

    // Mobile letterbox backdrop: stay white, then ease into the final blue over
    // the back half of the sequence (no per-frame colour flashing).
    if (stickyRef.current) {
      const progress = frameRef.current / (FRAME_COUNT - 1);
      const t = smoothstep(0.5, 1, progress);
      const r = Math.round(255 + (END_RGB[0] - 255) * t);
      const g = Math.round(255 + (END_RGB[1] - 255) * t);
      const b = Math.round(255 + (END_RGB[2] - 255) * t);
      stickyRef.current.style.backgroundColor = `rgb(${r},${g},${b})`;
    }

    const portrait = ch >= cw; // phones / narrow tablets
    const scale = portrait
      ? Math.min(cw / img.naturalWidth, ch / img.naturalHeight) // contain
      : Math.max(cw / img.naturalWidth, ch / img.naturalHeight); // cover
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }, []);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw();
    });
  }, [draw]);

  // Preload frames (handlers before src + already-complete handling).
  useEffect(() => {
    let mounted = true;
    let count = 0;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = imgs;
    const onReady = (i: number) => {
      if (!mounted) return;
      count += 1;
      setLoaded(count);
      if (i === frameRef.current) scheduleDraw();
    };
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => onReady(i);
      img.onerror = () => onReady(i);
      img.src = framePath(i);
      imgs[i] = img;
      if (img.complete && img.naturalWidth > 0) onReady(i);
    }
    return () => {
      mounted = false;
    };
  }, [scheduleDraw]);

  // Redraw when the canvas gets a real size.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => scheduleDraw());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [scheduleDraw]);

  // Scroll → frame index.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      frameRef.current = FRAME_COUNT - 1;
      scheduleDraw();
      return;
    }
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const scrubRange = section.offsetHeight - window.innerHeight;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = scrubRange > 0 ? clamp(scrolled / scrubRange, 0, 1) : 0;
      if (cueRef.current) {
        cueRef.current.style.opacity = clamp(1 - progress * 5, 0, 1).toFixed(3);
      }
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
  }, [scheduleDraw]);

  const pct = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-16 h-[200vh] w-full sm:h-[235vh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        style={{ backgroundColor: "#ffffff" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 h-full w-full"
          aria-label="FastForm Americas — cinematic machine intro"
          role="img"
        />

        {/* preload bar */}
        <div
          className={`absolute inset-x-0 top-0 z-30 h-0.5 bg-accent-signal transition-opacity duration-500 ${
            loaded >= FRAME_COUNT ? "opacity-0" : "opacity-100"
          }`}
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />

        {/* scroll cue — prominent, so first-time visitors know to scroll */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-24 motion-reduce:hidden"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-titanium/80">
            Scroll to explore
          </span>
          <span className="flex h-12 w-12 animate-float items-center justify-center rounded-full border border-titanium/25 bg-white/75 shadow-md backdrop-blur">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-titanium">
              <path
                d="M12 5v14M6 13l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
