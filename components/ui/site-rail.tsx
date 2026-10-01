"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navLinks } from "@/app/(default)/links";
import { normalizePath } from "@/lib/normalize-path";
import { NavLink } from "@/components/navigation/nav-link";
import { useNavigation } from "@/components/navigation/navigation-provider";
import { cn } from "@/utils/ui";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

export function SiteRail() {
  const pathname = usePathname();
  const { isPending, targetPath } = useNavigation();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";

    const focusFirst = () => {
      const root = overlayRef.current;
      if (!root) return;
      const items = getFocusable(root);
      items[0]?.focus();
    };
    const frame = window.requestAnimationFrame(focusFirst);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const scopes = [islandRef.current, overlayRef.current].filter(
        Boolean
      ) as HTMLElement[];
      const focusable = scopes.flatMap(getFocusable);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first || !focusable.includes(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (!active || active === last || !focusable.includes(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop index rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-52 flex-col border-r border-foreground/[0.06] bg-background/80 px-6 py-8 backdrop-blur-xl print:hidden lg:flex">
        <NavLink
          href="/"
          aria-label="Home"
          className={cn("group flex flex-col gap-4 rounded-md", focusRing)}
        >
          <Logo className="h-10 w-10 text-foreground" />
          <span className="max-w-[7rem] text-sm font-medium leading-snug tracking-tight text-foreground">
            Joshua
            <br />
            Manuputty
          </span>
        </NavLink>

        <nav
          aria-label="Primary"
          className="mt-10 flex flex-col gap-1 border-t border-foreground/[0.06] pt-6"
        >
          {navLinks.map((link) => {
            const active =
              isActive(pathname, link.href) ||
              (isPending && targetPath === normalizePath(link.href));

            return (
            <NavLink
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-baseline gap-3 rounded-xl px-2 py-2 text-sm transition-[color,transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                focusRing,
                active
                  ? "text-foreground motion-safe:translate-x-0.5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "relative",
                  active &&
                    "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-brand"
                )}
              >
                {link.label}
              </span>
            </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-foreground/[0.06] pt-4">
          <div className="flex items-center justify-between">
            <span className="font-condensed font-medium text-xs uppercase tracking-[0.08em] text-muted-foreground">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile floating island */}
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-[max(1rem,env(safe-area-inset-top))] print:hidden lg:hidden">
        <div
          ref={islandRef}
          className="mx-auto flex w-full max-w-lg items-center justify-between rounded-lg bg-background/80 px-2 py-2 shadow-[0_12px_40px_hsl(240_6%_10%/0.06)] backdrop-blur-xl dark:shadow-[0_12px_40px_hsl(0_0%_0%/0.35)]"
        >
          <NavLink
            href="/"
            aria-label="Home"
            className={cn("group rounded-md", focusRing)}
            onClick={() => setOpen(false)}
          >
            <Logo className="h-10 w-10 text-foreground" />
          </NavLink>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "relative grid h-10 w-10 place-items-center rounded-md text-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95",
                focusRing
              )}
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "translate-y-0 rotate-45" : "-translate-y-[3px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "translate-y-0 -rotate-45" : "translate-y-[3px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          ref={overlayRef}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-30 overscroll-contain bg-background/90 backdrop-blur-3xl transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex h-full flex-col justify-end px-6 pb-[max(4rem,env(safe-area-inset-bottom))] pt-28"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 rounded-xl py-3 text-3xl font-medium tracking-tight transition-[opacity,transform,color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] animate-fade-up",
                      focusRing,
                      isActive(pathname, link.href) ||
                      (isPending && targetPath === normalizePath(link.href))
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                    style={{ animationDelay: `${100 + index * 50}ms` }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
