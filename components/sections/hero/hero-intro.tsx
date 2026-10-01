"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { customMetadata } from "@/site.config";
import {
  RevealGroup,
  RevealGroupItem,
} from "@/components/motion/reveal-group";
import { registerGsap, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type HeroIntroProps = {
  professionalSummary: string;
  isOpenToWork: boolean;
  currentCompanyName?: string | null;
  currentCompanyUrl?: string | null;
};

export function HeroIntro({
  professionalSummary,
  isOpenToWork,
  currentCompanyName,
  currentCompanyUrl,
}: HeroIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

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
      <RevealGroup className="flex flex-col">
        <RevealGroupItem>
          <div className="flex flex-wrap items-center gap-3">
            {isOpenToWork ? (
              <Link
                href={customMetadata.emailUrl}
                className="inline-flex w-fit items-center gap-2 rounded-[3px] border border-brand/40 bg-brand-muted px-3 py-1 font-condensed text-xs font-medium uppercase tracking-[0.08em] text-brand transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand/15"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
                Open to work
              </Link>
            ) : (
              <span className="inline-flex w-fit items-center rounded-[3px] border border-border bg-card px-3 py-1 font-condensed font-medium text-xs uppercase tracking-[0.08em] text-muted-foreground">
                Site · Surabaya, ID
              </span>
            )}
            {currentCompanyName && currentCompanyUrl ? (
              <Link
                href={currentCompanyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center rounded-[3px] border border-border bg-card px-3 py-1 font-condensed font-medium text-xs uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-brand/40 hover:text-brand"
              >
                Firm · {currentCompanyName}
              </Link>
            ) : null}

          </div>
        </RevealGroupItem>

        <RevealGroupItem>
          <p className="mt-8 flex items-center gap-3 font-condensed font-medium text-xs uppercase tracking-[0.08em] text-brand">
            Software engineer, frontend focus
            <span aria-hidden className="dim-line w-16" />
          </p>
        </RevealGroupItem>

        <RevealGroupItem>
          <h1 className="mt-4 text-balance">
            <span className="block text-[clamp(3.5rem,12vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-foreground">
              Joshua
            </span>
            <span className="mt-1 block text-[clamp(2rem,6vw,3.75rem)] font-medium leading-[1] tracking-[-0.03em] text-muted-foreground">
              Manuputty
            </span>
          </h1>
        </RevealGroupItem>

        <RevealGroupItem>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {professionalSummary}
          </p>
        </RevealGroupItem>

        <RevealGroupItem>
          <div className="mt-10">
            <Link
              href={customMetadata.emailUrl}
              className="hero-cta group inline-flex items-center gap-3 rounded-md bg-brand py-2 pl-6 pr-2 text-sm font-medium text-brand-foreground transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get in touch
              <span className="grid h-9 w-9 place-items-center rounded-[4px] bg-brand-foreground/15 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <ArrowUpRight className="h-4 w-4" weight="bold" />
              </span>
            </Link>
          </div>
        </RevealGroupItem>
      </RevealGroup>
    </div>
  );
}
