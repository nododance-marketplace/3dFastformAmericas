"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Extra classes merged after the base spotlight styles. */
  as?: "div" | "article";
}

/**
 * A hairline panel whose border and surface illuminate under the cursor.
 * Sets --mx/--my custom properties consumed by the `.spotlight` CSS (globals).
 * Pointer tracking is throttled to the browser's own mousemove cadence and
 * writes only CSS variables, so there's no React re-render on move.
 */
export function SpotlightCard({
  children,
  className = "",
  as = "div",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement & HTMLElement>(null);

  const onMove = (e: MouseEvent) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const Tag = as;

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight ${className}`}
    >
      {children}
    </Tag>
  );
}
