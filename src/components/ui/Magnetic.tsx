"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

/**
 * Subtle magnetic pull on a primary action. The wrapper translates a few px
 * toward the cursor and settles back on leave — weighted and damped, never
 * springy. Transform-only (GPU), inert for touch input and for users who
 * prefer reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.18,
  className = "",
}: {
  children: ReactNode;
  /** Fraction of the cursor offset to follow. Keep ≤ 0.25. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const reset = () => {
    const node = ref.current;
    if (node) node.style.transform = "translate3d(0,0,0)";
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate3d(${(dx * strength).toFixed(1)}px, ${(
      dy * strength
    ).toFixed(1)}px, 0)`;
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`inline-block transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
