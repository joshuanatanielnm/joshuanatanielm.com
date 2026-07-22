"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { normalizePath } from "@/lib/normalize-path";
import type { NavPhase } from "@/lib/motion";

type NavigationContextValue = {
  phase: NavPhase;
  isPending: boolean;
  targetPath: string | null;
  skipMotion: boolean;
  startNavigation: (path: string) => void;
  completeTransition: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const [phase, setPhase] = useState<NavPhase>("idle");

  const completeTransition = useCallback(() => {
    setPhase("idle");
    setTargetPath(null);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setPhase("idle");
      setTargetPath(null);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (phase !== "loading" || !targetPath) return;
    if (normalizePath(pathname) !== normalizePath(targetPath)) return;

    if (reduceMotion) {
      completeTransition();
      return;
    }

    let cancelled = false;
    let raf2 = 0;

    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (!cancelled) setPhase("exiting");
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [pathname, targetPath, phase, reduceMotion, completeTransition]);

  const startNavigation = useCallback(
    (path: string) => {
      const next = normalizePath(path);
      if (next === normalizePath(pathname)) return;

      window.scrollTo({ top: 0, behavior: "instant" });

      flushSync(() => {
        setTargetPath(next);
        setPhase("loading");
      });
    },
    [pathname]
  );

  const isPending = phase !== "idle";
  const skipMotion = isPending;

  const value = useMemo(
    () => ({
      phase,
      isPending,
      targetPath,
      skipMotion,
      startNavigation,
      completeTransition,
    }),
    [
      phase,
      isPending,
      targetPath,
      skipMotion,
      startNavigation,
      completeTransition,
    ]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
