"use client";

import { useRef } from "react";
import { useNavigation } from "@/components/navigation/navigation-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * True when this component mounted during a route transition.
 * Prevents entry motion from firing after the page transition completes.
 */
export function useSuppressEntryMotion() {
  const { skipMotion } = useNavigation();
  return useRef(skipMotion).current;
}
