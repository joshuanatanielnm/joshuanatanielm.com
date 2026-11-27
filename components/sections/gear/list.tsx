"use client";

import {
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
import {
  Card,
  CardBody,
  CardLink,
  CardSource,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  RevealGroup,
  RevealGroupItem,
} from "@/components/motion/reveal-group";

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
      {grouped.map(({ category, meta, entries }) => (
        <div key={category} className="flex flex-col gap-4">
          <Reveal>
            <div className="flex items-center gap-2">
              <meta.Icon className="h-4 w-4 text-brand" weight="bold" />
              <h2 className=" font-medium text-sm text-muted-foreground">
                {meta.label}
              </h2>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          <RevealGroup>
            <ul className="grid gap-4 sm:grid-cols-2">
              {entries.map((item) => (
                <li key={item.slug}>
                  <RevealGroupItem className="h-full">
                    <Card interactive={Boolean(item.link)} className="h-full">
                      <CardBody className="gap-1.5">
                        <CardTitle>{item.name}</CardTitle>
                        {item.description ? (
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        ) : null}
                        {item.link ? (
                          <CardSource
                            href={item.link}
                            className="mt-auto pt-2 text-xs"
                          />
                        ) : null}
                      </CardBody>
                      {item.link ? (
                        <CardLink
                          href={item.link}
                          label={`More about ${item.name}`}
                        />
                      ) : null}
                    </Card>
                  </RevealGroupItem>
                </li>
              ))}
            </ul>
          </RevealGroup>
        </div>
      ))}
    </div>
  );
}
