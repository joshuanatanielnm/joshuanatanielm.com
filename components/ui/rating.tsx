import { Star } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/utils/ui";

export function Rating({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${clamped} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < clamped ? "text-brand" : "text-border"
          )}
          weight={i < clamped ? "fill" : "regular"}
        />
      ))}
    </div>
  );
}
