"use client";

import { ReactNode, useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { useRevealReady } from "@/hooks/use-reveal-ready";
import {
  GSAP_EASE,
  REVEAL_DURATION,
  REVEAL_GROUP_SCROLL_START,
  REVEAL_Y,
} from "@/lib/motion";
import { cn } from "@/utils/ui";

const REVEAL_ITEM_SELECTOR = "[data-reveal-item]";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the stagger sequence starts. */
  base?: number;
  /** Seconds between each child reveal. */
  step?: number;
};

export function RevealGroup({
  children,
  className,
  base = 0.06,
  step = 0.11,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready, reduce } = useRevealReady();

  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;

      const items = root.querySelectorAll<HTMLElement>(REVEAL_ITEM_SELECTOR);
      if (items.length === 0) return;

      if (reduce) {
        gsap.set(items, { clearProps: "all" });
        return;
      }

      if (!ready) {
        gsap.set(items, { autoAlpha: 0, y: REVEAL_Y });
        return;
      }

      gsap.set(items, { autoAlpha: 0, y: REVEAL_Y });

      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: REVEAL_DURATION,
        delay: base,
        stagger: step,
        ease: GSAP_EASE,
        scrollTrigger: {
          trigger: root,
          start: REVEAL_GROUP_SCROLL_START,
          once: true,
        },
      });
    },
    {
      scope: ref,
      dependencies: [ready, reduce, base, step],
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function RevealGroupItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal-item className={className}>
      {children}
    </div>
  );
}
