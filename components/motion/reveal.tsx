"use client";

import { ReactNode, useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { useRevealReady } from "@/hooks/use-reveal-ready";
import {
  GSAP_EASE,
  REVEAL_DURATION,
  REVEAL_SCROLL_START,
  REVEAL_Y,
} from "@/lib/motion";
import { cn } from "@/utils/ui";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Vertical offset before reveal (px). */
  y?: number;
};

export function Reveal({
  children,
  delay = 0,
  className,
  y = REVEAL_Y,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready, reduce } = useRevealReady();

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      if (reduce) {
        gsap.set(el, { clearProps: "all" });
        return;
      }

      if (!ready) {
        gsap.set(el, { autoAlpha: 0, y });
        return;
      }

      gsap.set(el, { autoAlpha: 0, y });

      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: REVEAL_DURATION,
        delay,
        ease: GSAP_EASE,
        scrollTrigger: {
          trigger: el,
          start: REVEAL_SCROLL_START,
          once: true,
        },
      });
    },
    {
      scope: ref,
      dependencies: [ready, reduce, delay, y],
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={ref} data-reveal className={cn(className)}>
      {children}
    </div>
  );
}
