import { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

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
    <Reveal>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {index ? (
            <span className="font-condensed font-medium text-xs uppercase tracking-[0.08em] text-muted-foreground">
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
    </Reveal>
  );
}
