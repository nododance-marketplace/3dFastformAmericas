/**
 * Small inline SVG flags for the language switcher. Inline (not emoji) because
 * emoji regional-indicator flags don't render on Windows browsers — they show
 * the letter code instead. Simplified but recognizable at ~20px.
 */

export function Flag({
  code,
  className = "",
}: {
  code: "us" | "mx" | "br";
  className?: string;
}) {
  if (code === "us") return <UsFlag className={className} />;
  if (code === "mx") return <MxFlag className={className} />;
  return <BrFlag className={className} />;
}

const box = "shrink-0 rounded-[2px] ring-1 ring-black/10";

function UsFlag({ className = "" }: { className?: string }) {
  // 13 stripes + blue canton with a hint of stars.
  const stripes = Array.from({ length: 13 }, (_, i) => (
    <rect
      key={i}
      y={(i * 40) / 13}
      width="60"
      height={40 / 13}
      fill={i % 2 === 0 ? "#b22234" : "#ffffff"}
    />
  ));
  return (
    <svg viewBox="0 0 60 40" className={`${box} ${className}`} aria-hidden="true">
      {stripes}
      <rect width="26" height={(40 / 13) * 7} fill="#3c3b6e" />
      <g fill="#ffffff">
        {[4, 11, 18].map((x) =>
          [3.5, 10, 16.5].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" />),
        )}
      </g>
    </svg>
  );
}

function MxFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={`${box} ${className}`} aria-hidden="true">
      <rect width="20" height="40" fill="#006847" />
      <rect x="20" width="20" height="40" fill="#ffffff" />
      <rect x="40" width="20" height="40" fill="#ce1126" />
      <circle cx="30" cy="20" r="4.2" fill="none" stroke="#8a6a3b" strokeWidth="1.4" />
    </svg>
  );
}

function BrFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={`${box} ${className}`} aria-hidden="true">
      <rect width="60" height="40" fill="#009c3b" />
      <polygon points="30,5 54,20 30,35 6,20" fill="#ffdf00" />
      <circle cx="30" cy="20" r="8" fill="#002776" />
    </svg>
  );
}
