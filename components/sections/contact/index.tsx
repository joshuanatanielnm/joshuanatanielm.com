"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { customMetadata } from "@/site.config";
import { socialLinks } from "@/app/(default)/links";
import { Reveal } from "@/components/motion/reveal";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <Reveal>
        <div className="grid gap-12 border-t border-border pt-16 lg:grid-cols-12 lg:gap-16 lg:pt-24">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              05 — Contact
            </p>
            <h2 className="mt-4 text-balance text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-foreground">
              Got something
              <br />
              to build?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              I&apos;m open to product work, frontend-heavy roles, or Web3 —
              from UI polish to shipping something end to end.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-8 lg:col-span-5">
            <Link
              href={customMetadata.emailUrl}
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-brand py-2 pl-6 pr-2 text-sm font-medium text-brand-foreground transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get in touch
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-foreground/15 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <ArrowUpRight className="h-4 w-4" weight="bold" />
              </span>
            </Link>

            <ul className="flex flex-col gap-2">
              {socialLinks
                .filter((link) => !link.internal)
                .map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
                    >
                      <link.Icon className="h-4 w-4" />
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:opacity-100 group-focus-visible:opacity-100" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
