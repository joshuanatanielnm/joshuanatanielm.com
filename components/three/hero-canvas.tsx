"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/ui";
import type { PointerState } from "./hero-scene";

const HeroScene = dynamic(
  () => import("./hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

const IDLE_POINTER: PointerState = {
  x: 0,
  y: 0,
  px: 0,
  py: 0,
  vx: 0,
  vy: 0,
  active: false,
  strength: 0,
  attract: false,
};

export function HeroBackdrop({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ ...IDLE_POINTER });
  const holdTimer = useRef<number | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Track pointer at the window level so the field stays interactive under
  // headline / cards. Coordinates stay relative to the hero bounds.
  useEffect(() => {
    if (reduce) return;

    const clearHold = () => {
      if (holdTimer.current !== null) {
        window.clearTimeout(holdTimer.current);
        holdTimer.current = null;
      }
    };

    const mapToContainer = (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (!inside) {
        pointer.current.active = false;
        pointer.current.attract = false;
        clearHold();
        return false;
      }

      const nx = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = -((clientY - rect.top) / rect.height - 0.5) * 2;

      const prev = pointer.current;
      prev.vx = nx - prev.x;
      prev.vy = ny - prev.y;
      prev.px = prev.x;
      prev.py = prev.y;
      prev.x = nx;
      prev.y = ny;
      prev.active = true;
      return true;
    };

    const markPlayed = () => {
      setHasPlayed(true);
      setHintVisible(false);
    };

    const onMove = (e: PointerEvent) => {
      if (mapToContainer(e.clientX, e.clientY)) {
        if (
          Math.hypot(pointer.current.vx, pointer.current.vy) > 0.012 &&
          !hasPlayed
        ) {
          markPlayed();
        }
      }
    };

    const onDown = (e: PointerEvent) => {
      if (!mapToContainer(e.clientX, e.clientY)) return;
      pointer.current.strength = 1;
      // Right-click attracts immediately; primary/touch switches after a hold.
      if (e.button === 2) {
        pointer.current.attract = true;
      } else {
        clearHold();
        holdTimer.current = window.setTimeout(() => {
          pointer.current.attract = true;
        }, 280);
      }
      markPlayed();
    };

    const onUp = () => {
      pointer.current.attract = false;
      clearHold();
    };

    const onContextMenu = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (inside) e.preventDefault();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("contextmenu", onContextMenu);

    return () => {
      clearHold();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("contextmenu", onContextMenu);
    };
  }, [reduce, hasPlayed]);

  // Auto-hide the hint after a few seconds even if they don't play.
  useEffect(() => {
    if (reduce || !hintVisible) return;
    const id = window.setTimeout(() => setHintVisible(false), 5200);
    return () => window.clearTimeout(id);
  }, [reduce, hintVisible]);

  if (reduce) {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
          className
        )}
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 opacity-95 dark:opacity-85">
        <HeroScene pointer={pointer} />
      </div>

      {/* Soft vignette so type stays readable while particles stay vivid. */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/35 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_82%)]" />

      <p
        aria-hidden={!hintVisible}
        className={cn(
          "pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border/60 bg-card/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground shadow-sm backdrop-blur-md transition-all duration-500 sm:bottom-8",
          hintVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0"
        )}
      >
        Drag to stir · click to burst · hold to pull
      </p>
    </div>
  );
}
