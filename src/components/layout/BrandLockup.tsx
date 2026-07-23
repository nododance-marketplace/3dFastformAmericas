import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  FASTFORM AMERICAS — BRAND LOCKUP
 * ─────────────────────────────────────────────────────────────────────────
 *  The official FastForm Americas logo (blue "FE" mark + wordmark), supplied
 *  as a transparent PNG in /public/brand. Renders at a fixed height with
 *  auto width so it stays crisp in the header and footer.
 *
 *  Props:
 *    compact  — render a touch smaller (tight spaces / mobile).
 *    onDark   — kept for API compatibility (the site is light-themed; the
 *               logo is designed for light surfaces).
 * ─────────────────────────────────────────────────────────────────────────
 */
export function BrandLockup({
  compact = false,
  onDark = false,
  className = "",
}: {
  compact?: boolean;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/brand/fastform-americas-logo.png"
      alt="FastForm Americas"
      width={900}
      height={219}
      priority
      className={`w-auto ${compact ? "h-7" : "h-8 sm:h-9"} ${
        onDark ? "brightness-0 invert" : ""
      } ${className}`}
    />
  );
}
