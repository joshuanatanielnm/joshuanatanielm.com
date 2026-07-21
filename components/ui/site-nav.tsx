"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { List } from "@phosphor-icons/react/dist/ssr";
import { navLinks } from "@/app/(default)/links";
import { registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/ui";
import { ThemeToggle } from "./theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduce || !headerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top-=8",
        onEnter: () => headerRef.current?.classList.add("nav-scrolled"),
        onLeaveBack: () => headerRef.current?.classList.remove("nav-scrolled"),
      });

      return () => trigger.kill();
    },
    { scope: headerRef, dependencies: [reduce] }
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md transition-shadow duration-300 print:hidden [&.nav-scrolled]:border-border [&.nav-scrolled]:bg-background/95 [&.nav-scrolled]:shadow-[0_8px_32px_hsl(24_10%_12%/0.06)] dark:[&.nav-scrolled]:shadow-[0_8px_32px_hsl(0_0%_0%/0.25)]"
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand font-mono text-sm text-brand-foreground transition-transform duration-300 group-hover:scale-105">
            JM
          </span>
          <span className="hidden text-foreground sm:inline">
            Joshua Manuputty
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-foreground",
                    isActive(pathname, link.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mx-1 hidden h-5 w-px bg-border md:block" />
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
              >
                <List className="h-[18px] w-[18px]" weight="bold" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>Navigation</SheetTitle>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-base transition-colors hover:bg-accent",
                          isActive(pathname, link.href)
                            ? "bg-accent font-medium text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
