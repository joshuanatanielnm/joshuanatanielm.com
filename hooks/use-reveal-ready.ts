"use client";

import { useEffect, useState } from "react";
import { useNavigation } from "@/components/navigation/navigation-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useSuppressEntryMotion } from "@/hooks/use-suppress-entry-motion";

export function useRevealReady() {
  const reduce = useReducedMotion();
  const { phase } = useNavigation();
  const mountedDuringTransition = useSuppressEntryMotion();
  const [canAnimate, setCanAnimate] = useState(!mountedDuringTransition);

  useEffect(() => {
    if (!mountedDuringTransition) return;
    if (phase === "idle") setCanAnimate(true);
  }, [phase, mountedDuringTransition]);

  const ready = !reduce && canAnimate && phase === "idle";

  return { ready, reduce };
}
