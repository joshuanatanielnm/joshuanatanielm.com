import { cn } from "@/utils/ui";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-[3px] bg-muted", className)}
    />
  );
}
