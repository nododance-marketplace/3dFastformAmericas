"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  HOME — SCROLL-SCRUBBED HEADER SEQUENCE
 * ─────────────────────────────────────────────────────────────────────────
 *  A cinematic intro: 56 frames that zoom into the FastForm Americas machine
 *  and dissolve to solid blue. Drawn to a <canvas>, scrubbed by scroll (same
 *  technique as the shop hero). COVER-fit so the frame fills the viewport with
 *  no letterbox — and because the last frame is solid blue, the section that
 *  follows (same blue) fades in seamlessly.
 * ─────────────────────────────────────────────────────────────────────────
 */

const FRAME_COUNT = 70;
/** Solid blue the sequence ends on — sampled from the final frame. Kept in
 *  sync with the <AmericasSection> background so the transition is seamless. */
export const SEQUENCE_END_BLUE = "#2c4a86";
const framePath = (i: number) =>
  `/header-rotation/frame-${String(i + 1).padStart(2, "0")}.jpg`;

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function HeaderSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(0);

  /** Draw the current frame, COVER-fit + DPR-scaled. */
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
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
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

  // Preload every frame (handlers before src + already-complete handling).
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
      frameRef.current = FRAME_COUNT - 1; // land on the final blue frame
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
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        style={{ backgroundColor: SEQUENCE_END_BLUE }}
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

        {/* scroll cue — fades as the sequence plays */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-titanium/70 motion-reduce:hidden"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="animate-float">
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
