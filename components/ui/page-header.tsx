import { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  meta,
  index,
}: {
  title: string;
  description?: string;
  meta?: ReactNode;
  index?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {index ? (
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {index}
          </span>
        ) : null}
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {meta ? <div>{meta}</div> : null}
    </div>
  );
}
