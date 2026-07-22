/** Primary editorial ease — heavy mass, spring-like deceleration. */
export const MOTION_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

/** GSAP ease approximating editorial spring deceleration. */
export const GSAP_EASE = "power3.out";

export const REVEAL_Y = 28;
export const REVEAL_DURATION = 0.85;
export const REVEAL_SCROLL_START = "top 88%";
export const REVEAL_GROUP_SCROLL_START = "top 85%";

export const MOTION_DURATION = {
  fast: 400,
  base: 700,
  slow: 850,
} as const;

export type NavPhase = "idle" | "loading" | "exiting";

type StaggerOptions = {
  /** Delay before the first item animates (seconds). */
  base?: number;
  /** Delay added per index step (seconds). */
  step?: number;
  /** Maximum total delay cap (seconds). */
  max?: number;
};

/** Stagger delay for list/card reveals — one beat apart by default. */
export function staggerDelay(index: number, options: StaggerOptions = {}) {
  const { base = 0.06, step = 0.11, max = 0.88 } = options;
  return Math.min(base + index * step, max);
}
