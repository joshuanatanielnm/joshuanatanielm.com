"use client";

import Link from "next/link";
import { socialLinks } from "@/app/(default)/links";
import { NavLink } from "@/components/navigation/nav-link";

export const Footer = () => {
  return (
    <footer className="border-t border-border print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-condensed font-medium text-xs uppercase tracking-[0.08em] text-muted-foreground">
            Joshua Manuputty
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Software engineer · end-to-end web products.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {socialLinks.map((link) =>
            link.internal ? (
              <NavLink
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="text-sm text-muted-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
              >
                {link.label}
              </NavLink>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
};
