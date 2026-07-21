import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";

const statusMap: Record<
  string,
  { label: string; variant: "brand" | "default" | "muted" }
> = {
  playing: { label: "Playing", variant: "brand" },
  finished: { label: "Finished", variant: "default" },
  backlog: { label: "Backlog", variant: "muted" },
  wishlist: { label: "Wishlist", variant: "muted" },
};

const platformMap: Record<string, string> = {
  pc: "PC",
  playstation: "PlayStation",
  switch: "Switch",
  xbox: "Xbox",
  mobile: "Mobile",
};

export interface GameCardProps {
  title: string;
  coverUrl?: string | null;
  platform: string;
  status: string;
  rating?: number | null;
  hours?: number | null;
  link?: string | null;
  note?: string;
}

export function GameCard(props: GameCardProps) {
  const status = statusMap[props.status] ?? statusMap.finished;
  const platform = platformMap[props.platform] ?? props.platform;
  const hasUrl = Boolean(props.link);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {props.coverUrl ? (
          <Image
            src={props.coverUrl}
            alt={`${props.title} art`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center font-mono text-sm text-muted-foreground/50">
            {props.title}
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium leading-tight text-foreground">
            {props.title}
          </h3>
          {hasUrl ? (
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
              weight="bold"
            />
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          <span>{platform}</span>
          {typeof props.hours === "number" ? (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {props.hours}h
            </span>
          ) : null}
        </div>

        {typeof props.rating === "number" ? (
          <Rating value={props.rating} />
        ) : null}
        {props.note ? (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {props.note}
          </p>
        ) : null}
      </div>

      {hasUrl ? (
        <Link
          href={props.link as string}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={`More about ${props.title}`}
        />
      ) : null}
    </article>
  );
}
