"use client";

import { ReactNode, useEffect, useState } from "react";
import { useNavigation } from "@/components/navigation/navigation-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useSuppressEntryMotion } from "@/hooks/use-suppress-entry-motion";
import { cn } from "@/utils/ui";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Kept for API compatibility; CSS fade-up distance is fixed in keyframes. */
  y?: number;
};

export function Reveal({
  children,
  delay = 0,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const { phase } = useNavigation();
  const mountedDuringTransition = useSuppressEntryMotion();
  const [canAnimate, setCanAnimate] = useState(!mountedDuringTransition);

  useEffect(() => {
    if (!mountedDuringTransition) return;
    if (phase === "idle") setCanAnimate(true);
  }, [phase, mountedDuringTransition]);

  const waiting = mountedDuringTransition && !canAnimate;
  const animate = !reduce && canAnimate && phase === "idle";

  return (
    <div
      className={cn(
        waiting && "opacity-0",
        animate && "motion-safe:animate-fade-up",
        className
      )}
      style={
        animate ? { animationDelay: `${Math.round(delay * 1000)}ms` } : undefined
      }
    >
      {children}
    </div>
  );
}
