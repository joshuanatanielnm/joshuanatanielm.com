"use client";

import type { AnimationEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { RouteSkeleton } from "@/components/navigation/route-skeleton";
import { useNavigation } from "@/components/navigation/navigation-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { normalizePath } from "@/lib/normalize-path";
import { cn } from "@/utils/ui";

export function NavigationShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { phase, targetPath, completeTransition } = useNavigation();
  const overlayDone = useRef(false);
  const contentDone = useRef(false);

  const showOverlay = phase === "loading" || phase === "exiting";
  const routeReady =
    Boolean(targetPath) &&
    normalizePath(pathname) === normalizePath(targetPath ?? "");

  useEffect(() => {
    if (phase !== "exiting") {
      overlayDone.current = false;
      contentDone.current = false;
    }
  }, [phase]);

  const tryComplete = () => {
    if (phase !== "exiting") return;
    if (overlayDone.current && contentDone.current) {
      completeTransition();
    }
  };

  const handleOverlayAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (phase !== "exiting") return;
    overlayDone.current = true;
    tryComplete();
  };

  const handleContentAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (phase !== "exiting") return;
    if (event.animationName !== "page-enter") return;
    contentDone.current = true;
    tryComplete();
  };

  return (
    <main
      id="main-content"
      className="relative flex-1 overflow-x-clip pt-20 lg:pt-0"
      aria-busy={showOverlay}
    >
      <div
        key={pathname}
        onAnimationEnd={handleContentAnimationEnd}
        className={cn(
          !reduceMotion &&
            phase === "loading" &&
            !routeReady &&
            "motion-safe:scale-[0.992] motion-safe:opacity-[0.42] motion-safe:transition-[transform,opacity] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]",
          !reduceMotion &&
            routeReady &&
            phase === "loading" &&
            "nav-content-pre-enter",
          !reduceMotion && phase === "exiting" && "nav-content-entering"
        )}
      >
        {children}
      </div>

      {showOverlay ? (
        <div
          className={cn(
            "absolute inset-0 z-10 bg-background/95 backdrop-blur-[2px]",
            !reduceMotion &&
              phase === "loading" &&
              "motion-safe:animate-nav-overlay-in",
            !reduceMotion &&
              phase === "exiting" &&
              "motion-safe:animate-nav-overlay-out",
            reduceMotion && phase === "exiting" && "opacity-0"
          )}
          onAnimationEnd={handleOverlayAnimationEnd}
        >
          <RouteSkeleton />
        </div>
      ) : null}
    </main>
  );
}
