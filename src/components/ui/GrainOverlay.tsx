/**
 * Fixed, non-interactive film-grain layer over the whole page. Breaks the
 * digital flatness of large dark surfaces so gradients don't band. The noise
 * is an inline SVG fractal — no network request, no external asset.
 */
export function GrainOverlay() {
  const noise = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.04] mix-blend-multiply"
      style={{
        backgroundImage: `url("data:image/svg+xml,${noise}")`,
        backgroundSize: "140px 140px",
      }}
    />
  );
}
