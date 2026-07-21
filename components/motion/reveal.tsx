"use client";

import { ReactNode, useRef } from "react";
import { registerGsap, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/ui";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

export function Reveal({ children, delay = 0, className, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !ref.current) return;

      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: 0.85,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [reduce, delay, y] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
