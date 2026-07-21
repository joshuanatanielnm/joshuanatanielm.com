import { ReactNode } from "react";
import { cn } from "@/utils/ui";

type SectionHeadingProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({
  title,
  description,
  action,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <Tag className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </Tag>
        {description ? (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
