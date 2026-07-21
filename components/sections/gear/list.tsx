import Link from "next/link";
import {
  ArrowUpRight,
  Chair,
  Cube,
  DeviceMobile,
  Headphones,
  Keyboard,
  Laptop,
  Monitor,
  Terminal,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/reveal";

export type GearItem = {
  slug: string;
  name: string;
  category: string;
  description?: string;
  link?: string | null;
  featured: boolean;
};

const categoryMeta: Record<string, { label: string; Icon: Icon }> = {
  computer: { label: "Computer", Icon: Laptop },
  display: { label: "Display", Icon: Monitor },
  desk: { label: "Desk & Chair", Icon: Chair },
  input: { label: "Peripherals", Icon: Keyboard },
  audio: { label: "Audio", Icon: Headphones },
  mobile: { label: "Mobile", Icon: DeviceMobile },
  software: { label: "Software", Icon: Terminal },
  other: { label: "Other", Icon: Cube },
};

const categoryOrder = [
  "computer",
  "display",
  "input",
  "desk",
  "audio",
  "mobile",
  "software",
  "other",
];

export function GearList({ items }: { items: GearItem[] }) {
  const grouped = categoryOrder
    .map((category) => ({
      category,
      meta: categoryMeta[category],
      entries: items
        .filter((item) => item.category === category)
        .sort((a, b) => Number(b.featured) - Number(a.featured)),
    }))
    .filter((group) => group.entries.length > 0);

  return (
    <div className="flex flex-col gap-10">
      {grouped.map(({ category, meta, entries }, groupIndex) => (
        <Reveal key={category} delay={Math.min(groupIndex * 0.05, 0.2)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <meta.Icon
                className="h-4 w-4 text-brand"
                weight="bold"
              />
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {meta.label}
              </h2>
              <span className="h-px flex-1 bg-border" />
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {entries.map((item) => {
                const content = (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-foreground">
                        {item.name}
                      </span>
                      {item.link ? (
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                      ) : null}
                    </div>
                    {item.description ? (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </>
                );

                return (
                  <li key={item.slug}>
                    {item.link ? (
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col gap-1.5 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand/40"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="group flex h-full flex-col gap-1.5 rounded-2xl border border-border bg-card p-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
