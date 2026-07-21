"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { customMetadata } from "@/site.config";
import { socialLinks } from "@/app/(default)/links";
import { registerGsap, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type HeroIntroProps = {
  professionalSummary: string;
  isOpenToWork: boolean;
};

export function HeroIntro({
  professionalSummary,
  isOpenToWork,
}: HeroIntroProps) {
  const externalSocialLinks = socialLinks.filter((link) => !link.internal);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !containerRef.current) return;

      const items = containerRef.current.querySelectorAll(".hero-item");
      gsap.from(items, {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });

      const accent = containerRef.current.querySelector(".hero-accent");
      if (accent) {
        gsap.fromTo(
          accent,
          { backgroundSize: "0% 100%" },
          {
            backgroundSize: "100% 100%",
            duration: 0.8,
            ease: "power2.out",
            delay: 0.55,
          }
        );
      }
    },
    { scope: containerRef, dependencies: [reduce] }
  );

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
          x: x * 0.18,
          y: y * 0.18,
          duration: 0.35,
          ease: "power2.out",
        });
      });

      const onLeave = contextSafe(() => {
        gsap.to(cta, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
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
      <div className="hero-item">
        {isOpenToWork ? (
          <Link
            href={customMetadata.emailUrl}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-medium text-brand transition-colors hover:bg-brand/15"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Available for new opportunities
          </Link>
        ) : (
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
            Frontend Engineer · Surabaya, Indonesia
          </span>
        )}
      </div>

      <h1 className="hero-item text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Hi, I&apos;m Joshua. I build web apps people{" "}
        <span className="hero-accent inline bg-gradient-to-r from-brand/30 to-brand/30 bg-[length:0%_100%] bg-no-repeat bg-left-bottom px-0.5 text-brand">
          enjoy
        </span>{" "}
        using.
      </h1>

      <p className="hero-item mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
        {professionalSummary}
      </p>

      <div className="hero-item mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={customMetadata.emailUrl}
          className="hero-cta inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Get in touch
          <ArrowUpRight className="h-4 w-4" weight="bold" />
        </Link>
        <Link
          href={customMetadata.resumeUrl}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand"
        >
          View résumé
        </Link>
      </div>

      <div className="hero-item mt-8 flex flex-wrap items-center gap-2">
        {externalSocialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
          >
            <link.Icon className="h-[18px] w-[18px]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
