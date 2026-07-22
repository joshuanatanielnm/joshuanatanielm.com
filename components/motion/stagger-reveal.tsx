"use client";

import type { ComponentProps } from "react";
import { Reveal } from "@/components/motion/reveal";
import { staggerDelay } from "@/lib/motion";

type StaggerRevealProps = ComponentProps<typeof Reveal> & {
  index: number;
  step?: number;
  max?: number;
  base?: number;
};

export function StaggerReveal({
  index,
  step,
  max,
  base,
  delay,
  ...props
}: StaggerRevealProps) {
  return (
    <Reveal
      delay={delay ?? staggerDelay(index, { step, max, base })}
      {...props}
    />
  );
}
