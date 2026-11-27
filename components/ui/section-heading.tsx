import { ReactNode } from "react";
import { cn } from "@/utils/ui";

type SectionHeadingProps = {
  index?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({
  index,
  title,
  description,
  action,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        {index ? (
          <span className="flex items-center gap-3 font-medium text-sm text-brand">
            {index}
            <span aria-hidden className="dim-line w-16" />
          </span>
        ) : null}
        <Tag className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </Tag>
        {description ? (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className="shrink-0 lg:pt-5">{action}</div>
      ) : null}
    </div>
  );
}
