"use client";

import { useState } from "react";
import Image from "next/image";
import type { Category } from "@/lib/types";

interface ProductImageProps {
  src?: string;
  alt: string;
  category: Category;
  /** Optional label (e.g. model code) shown on the placeholder. */
  label?: string;
  /** Larger motif + sizing for the detail page gallery. */
  priority?: boolean;
  className?: string;
}

/**
 * Renders the real product photo when a valid one is supplied. If the path is
 * missing OR the file fails to load (e.g. the current scraped placeholders),
 * it falls back to an on-brand "coming soon" panel — so the layout never shows
 * a broken-image glyph, and dropping a real photo at the same path later just
 * works with no code change.
 */
export function ProductImage({
  src,
  alt,
  category,
  label,
  priority,
  className = "",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    // Studio product shots sit on a light tile so the full machine reads
    // cleanly against the dark UI (no cropping of tall units).
    return (
      <div className={`relative overflow-hidden bg-white ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={src.endsWith(".svg")}
          className="object-contain p-4"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-base-800 ${className}`}
      role="img"
      aria-label={`${alt} — photography coming soon`}
    >
      {/* Blueprint grid + steel sheen */}
      <div className="absolute inset-0 bg-grid-faint [background-size:26px_26px]" />
      <div className="absolute inset-0 bg-steel-sheen" />
      {/* Violet glow behind the motif */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />

      {/* Layered additive-manufacturing motif — echoes the emblem */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="34%"
          viewBox="0 0 40 44"
          fill="none"
          className="text-steel"
          aria-hidden="true"
        >
          <path d="M20 27 L37 35.5 L20 44 L3 35.5 Z" fill="currentColor" opacity="0.18" />
          <path d="M20 15.5 L37 24 L20 32.5 L3 24 Z" fill="currentColor" opacity="0.28" />
          <path d="M20 4 L37 12.5 L20 21 L3 12.5 Z" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-steel/70">
        <span>{label ?? category}</span>
        <span>Photo coming soon</span>
      </div>
    </div>
  );
}
