"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/utils/ui";

export type WorkItem = {
  title: string;
  subtitle: string;
  url: string;
  host: string;
  imageUrl?: string;
  tech: string[];
};

function joinNatural(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * A table of contents you can point at. The names are the design: set large,
 * stacked, and the one under the cursor lights up while its screenshot is
 * drawn on the sheet beside it. On small screens each entry carries its own
 * image instead.
 */
export function WorkIndex({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <ol
        className="lg:col-span-6"
        onMouseLeave={() => setActive(0)}
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <li
              key={item.title}
              className="border-t border-border/70 last:border-b"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-6 outline-none sm:py-7"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span
                    className={cn(
                      "text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-none tracking-[-0.03em] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      isActive ? "text-foreground" : "text-muted-foreground/60"
                    )}
                  >
                    {item.title}
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    className={cn(
                      "h-5 w-5 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      isActive
                        ? "translate-x-0 text-brand opacity-100"
                        : "-translate-x-1 opacity-0"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "mt-3 block max-w-md text-sm leading-relaxed text-muted-foreground transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    isActive ? "opacity-100" : "opacity-60"
                  )}
                >
                  {item.subtitle}
                </span>

                {/* Small screens: the screenshot travels with its entry. */}
                {item.imageUrl ? (
                  <span className="relative mt-5 block aspect-[16/10] overflow-hidden rounded-[3px] bg-muted ring-1 ring-foreground/10 lg:hidden">
                    <Image
                      src={item.imageUrl}
                      alt={`${item.title} screenshot`}
                      fill
                      sizes="100vw"
                      className="object-cover object-top"
                    />
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Large screens: one sheet, the active drawing on it. */}
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-24">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-muted ring-1 ring-foreground/10">
            {items.map((item, i) =>
              item.imageUrl ? (
                <Image
                  key={item.title}
                  src={item.imageUrl}
                  alt={`${item.title} screenshot`}
                  fill
                  sizes="50vw"
                  className={cn(
                    "object-cover object-top transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    i === active ? "opacity-100" : "opacity-0"
                  )}
                  priority={i === 0}
                />
              ) : null
            )}
          </div>

          <dl
            key={current.title}
            className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm motion-safe:animate-fade-up"
          >
            {current.tech.length > 0 ? (
              <>
                <dt className="text-muted-foreground">Built with</dt>
                <dd className="text-foreground">{joinNatural(current.tech)}</dd>
              </>
            ) : null}
            <dt className="text-muted-foreground">Live at</dt>
            <dd>
              <Link
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground transition-colors duration-500 hover:text-brand"
              >
                {current.host}
                <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
              </Link>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
