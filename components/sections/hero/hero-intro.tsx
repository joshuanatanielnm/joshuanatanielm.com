"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { customMetadata } from "@/site.config";
import { registerGsap, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useSuppressEntryMotion } from "@/hooks/use-suppress-entry-motion";
import { cn } from "@/utils/ui";

type HeroIntroProps = {
  professionalSummary: string;
  isOpenToWork: boolean;
};

export function HeroIntro({
  professionalSummary,
  isOpenToWork,
}: HeroIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const suppressEntry = useSuppressEntryMotion();
  const animate = !reduce && !suppressEntry;

  useGSAP(
    (_, contextSafe) => {
      registerGsap();
      if (reduce || !containerRef.current || !contextSafe) return;

      const cta = containerRef.current.querySelector(".hero-cta");
      if (!cta) return;

      const onMove = contextSafe((e: Event) => {
        const event = e as PointerEvent;
        const rect = cta.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(cta, {
          x: x * 0.14,
          y: y * 0.14,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      const onLeave = contextSafe(() => {
        gsap.to(cta, {
          x: 0,
          y: 0,
          duration: 0.55,
          ease: "elastic.out(1, 0.5)",
        });
      });

      cta.addEventListener("pointermove", onMove);
      cta.addEventListener("pointerleave", onLeave);

      return () => {
        cta.removeEventListener("pointermove", onMove);
        cta.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: containerRef, dependencies: [reduce] }
  );

  return (
    <div ref={containerRef} className="flex flex-col justify-center">
      <div
        className={cn(
          "flex flex-wrap items-center gap-3",
          animate && "animate-fade-up"
        )}
        style={animate ? { animationDelay: "80ms" } : undefined}
      >
        {isOpenToWork ? (
          <Link
            href={customMetadata.emailUrl}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-brand transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand/15"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            Open to work
          </Link>
        ) : (
          <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Surabaya · ID
          </span>
        )}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Software Engineer
        </span>
      </div>

      <h1
        className={cn(
          "mt-8 text-balance",
          animate && "animate-fade-up"
        )}
        style={animate ? { animationDelay: "180ms" } : undefined}
      >
        <span className="block text-[clamp(3.5rem,12vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-foreground">
          Joshua
        </span>
        <span className="mt-1 block text-[clamp(2rem,6vw,3.75rem)] font-medium leading-[1] tracking-[-0.03em] text-muted-foreground">
          Manuputty
        </span>
      </h1>

      <p
        className={cn(
          "mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg",
          animate && "animate-fade-up"
        )}
        style={animate ? { animationDelay: "280ms" } : undefined}
      >
        {professionalSummary}
      </p>

      <div
        className={cn("mt-10", animate && "animate-fade-up")}
        style={animate ? { animationDelay: "380ms" } : undefined}
      >
        <Link
          href={customMetadata.emailUrl}
          className="hero-cta group inline-flex items-center gap-3 rounded-full bg-brand py-2 pl-6 pr-2 text-sm font-medium text-brand-foreground transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Get in touch
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-foreground/15 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
            <ArrowUpRight className="h-4 w-4" weight="bold" />
          </span>
        </Link>
      </div>
    </div>
  );
}
