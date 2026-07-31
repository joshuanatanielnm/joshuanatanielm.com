"use client";

import type { ComponentProps } from "react";
import { RevealGroupItem } from "@/components/motion/reveal-group";

type StaggerRevealProps = ComponentProps<typeof RevealGroupItem> & {
  /** Kept for call-site compatibility; stagger is handled by the parent RevealGroup. */
  index?: number;
  step?: number;
  max?: number;
  base?: number;
  delay?: number;
};

export function StaggerReveal({ index: _index, ...props }: StaggerRevealProps) {
  return <RevealGroupItem {...props} />;
}
