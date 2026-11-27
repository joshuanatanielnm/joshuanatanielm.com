import { cn } from "@/utils/ui";

/** A five-step scale read like a ruler: inked ticks for the score. */
export function Rating({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  return (
    <span
      className={cn("inline-flex items-center gap-[3px]", className)}
      role="img"
      aria-label={`Rated ${clamped} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-2.5 w-[3px] rounded-[1px]",
            i < clamped ? "bg-brand" : "bg-foreground/15"
          )}
        />
      ))}
    </span>
  );
}
