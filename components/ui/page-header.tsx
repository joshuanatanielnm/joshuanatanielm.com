import { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  meta,
}: {
  title: string;
  description?: string;
  meta?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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
