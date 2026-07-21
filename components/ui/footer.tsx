import Link from "next/link";
import { socialLinks } from "@/app/(default)/links";

export const Footer = () => {
  return (
    <footer className="border-t border-border/70 print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Joshua Manuputty</p>
          <p>Built with Next.js and Tailwind CSS. © 2026, all rights reserved.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-label={link.label}
              target={link.internal ? undefined : "_blank"}
              rel={link.internal ? undefined : "noopener noreferrer"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
            >
              <link.Icon className="h-[18px] w-[18px]" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
