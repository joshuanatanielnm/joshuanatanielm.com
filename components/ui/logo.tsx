import { cn } from "@/utils/ui";

type LogoProps = {
  className?: string;
  /**
   * When true, hovering the nearest `group` ancestor replays the signature:
   * the two pen strokes redraw and the blue full stop pops back in.
   * Motion lives in globals.css (`.logo-sig`) and respects reduced-motion.
   */
  animateOnGroupHover?: boolean;
};

/**
 * Brand mark — "Signature J.": a hand-drawn J in two pen strokes, signed
 * off with an ink-blue full stop.
 *
 * Strokes use `currentColor`, so the parent sets the ink colour; the full
 * stop is always brand blue. Paths carry `pathLength={1}` so the redraw
 * animation can use normalized dash values.
 */
export function Logo({ className, animateOnGroupHover = true }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={cn("block", animateOnGroupHover && "logo-sig", className)}
    >
      <g stroke="currentColor" strokeLinecap="round">
        <path
          className="logo-sig-stroke"
          d="M32 30 Q47 22 63 27"
          strokeWidth={8.5}
          pathLength={1}
        />
        <path
          className="logo-sig-stroke"
          d="M54 25 Q59 42 53 57 Q49 68 39 70 Q29 71 29 62 Q29 56 36 55"
          strokeWidth={8.5}
          pathLength={1}
        />
      </g>
      <circle
        className="logo-sig-dot fill-brand"
        cx={70}
        cy={66}
        r={6}
      />
    </svg>
  );
}
