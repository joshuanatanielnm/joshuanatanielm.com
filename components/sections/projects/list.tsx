import type * as React from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardLink,
  CardSource,
  CardSpecs,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/ui";

export interface ProjectCardProps {
  title: string;
  description: string;
  techLabels: string[];
  tagLabels?: string[];
  projectUrl: string;
  imageUrl?: string;
  className?: string;
  featured?: boolean;
}

function joinNatural(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function ProjectCard(props: ProjectCardProps) {
  const hasUrl = Boolean(props.projectUrl);
  const tags = props.tagLabels ?? [];

  const specs: { label: string; value: React.ReactNode }[] = [];
  if (props.techLabels.length > 0) {
    specs.push({ label: "Built with", value: joinNatural(props.techLabels) });
  }
  if (tags.length > 0) {
    specs.push({ label: "Filed under", value: joinNatural(tags) });
  }
  if (hasUrl) {
    specs.push({
      label: "Live at",
      value: <CardSource href={props.projectUrl} />,
    });
  }

  return (
    <Card as="article" interactive={hasUrl} className={props.className}>
      {/* The drawing: the screenshot fills the top of the sheet, read from its top edge. */}
      <div className="drafting-grid relative aspect-[16/10] overflow-hidden border-b border-border/70 bg-background">
        {props.imageUrl ? (
          <Image
            src={props.imageUrl}
            alt={`${props.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover object-top"
          />
        ) : (
          <span className="absolute bottom-4 left-5 text-sm text-muted-foreground">
            No screenshot yet
          </span>
        )}
      </div>

      <CardBody className="gap-2 p-5 sm:p-6">
        <CardTitle
          className={cn(
            props.featured ? "text-xl sm:text-2xl" : "text-lg",
            "leading-tight"
          )}
        >
          {props.title}
        </CardTitle>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          {props.description}
        </p>
      </CardBody>

      <CardSpecs rows={specs} className="px-5 py-4 sm:px-6" />

      {hasUrl ? (
        <CardLink href={props.projectUrl} label={`Open ${props.title}`} />
      ) : null}
    </Card>
  );
}
