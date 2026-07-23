"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms before the reveal plays. */
  delay?: number;
  /** Entry direction. Defaults to a subtle rise. */
  from?: Direction;
  /** Travel distance in px (ignored for scale/none). */
  distance?: number;
  /** Reveal duration in ms. */
  duration?: number;
  className?: string;
  /** Render as a different element (e.g. "li", "section"). */
  as?: ElementType;
}

const OFFSCREEN: Record<Direction, string> = {
  up: "translate3d(0, var(--d), 0)",
  down: "translate3d(0, calc(-1 * var(--d)), 0)",
  left: "translate3d(var(--d), 0, 0)",
  right: "translate3d(calc(-1 * var(--d)), 0, 0)",
  scale: "scale(0.94)",
  none: "translate3d(0,0,0)",
};

/**
 * Scroll-triggered reveal. A richer sibling of FadeIn: choose a direction,
 * distance, and duration. Animates transform + opacity only (GPU friendly),
 * fires once, and fully respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  distance = 22,
  duration = 750,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        "--d": `${distance}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : OFFSCREEN[from],
        filter: visible ? "blur(0)" : "blur(6px)",
        transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
