"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Movement factor. Positive drifts slower than scroll (recedes); negative
   *  moves against scroll (advances). ~0.15 is a tasteful default. */
  speed?: number;
  className?: string;
}

/**
 * Lightweight scroll parallax. Translates the layer on the Y axis relative to
 * how far it sits from the viewport centre, driven by a single shared rAF loop
 * on scroll. Transform-only (no layout thrash); disabled for reduced motion.
 */
export function Parallax({ children, speed = 0.15, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const viewportCentre = window.innerHeight / 2;
      const elementCentre = rect.top + rect.height / 2;
      const offset = (elementCentre - viewportCentre) * -speed;
      node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
