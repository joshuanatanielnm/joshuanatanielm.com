import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/utils/ui";

/**
 * Sheet card.
 *
 * A card on this site is a sheet of paper lying on the drafting table: a
 * squared, borderless sheet with a real cast shadow. What goes on it follows
 * the drawing-set vocabulary instead of the usual image / title / badge stack:
 *
 *   CardPlate     a recess showing the drafting grid, where an object stands
 *   CardObject    the object itself, at its real proportions, on the plate's line
 *   CardCallouts  ruled notes beside the object (status, rating, date)
 *   CardBody      title and prose
 *   CardSpecs     the title block: a ruled label / value table at the foot
 *   CardSource    where the card links to, written out as a host name
 *   CardLink      makes the whole sheet one link
 */

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "figure";
  /** The card links somewhere: it lifts and its title is inked on hover. */
  interactive?: boolean;
};

function Card({ as: Tag = "div", interactive, className, ...props }: CardProps) {
  return (
    <Tag
      data-interactive={interactive ? "" : undefined}
      className={cn(
        "sheet-card relative flex flex-col overflow-hidden rounded-[3px] bg-card text-card-foreground shadow-sheet",
        className
      )}
      {...props}
    />
  );
}

function CardPlate({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "drafting-grid relative flex items-end gap-4 bg-background px-4 pt-5",
        className
      )}
      {...props}
    >
      {children}
      {/* The line the object stands on, ticked at both ends like a dimension. */}
      <span aria-hidden className="dim-line absolute inset-x-4 bottom-0" />
    </div>
  );
}

const OBJECT_SHAPE = {
  // Real-world proportions: a paperback and a game case.
  cover: "aspect-[2/3] w-24",
  keyart: "aspect-[3/4] w-[6.5rem]",
} as const;

function CardObject({
  src,
  alt,
  label,
  shape = "cover",
  className,
}: {
  src?: string | null;
  alt: string;
  /** Shown on the blank object when there is no image. */
  label: string;
  shape?: keyof typeof OBJECT_SHAPE;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[2px] bg-muted shadow-object",
        OBJECT_SHAPE[shape],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="112px" className="object-cover" />
      ) : (
        <span className="flex h-full w-full items-end p-2 text-xs leading-tight text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}

function CardCallouts({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "flex min-w-0 flex-1 flex-col pb-3 text-xs leading-snug text-muted-foreground [&>li]:border-t [&>li]:border-border [&>li]:py-1.5",
        className
      )}
      {...props}
    />
  );
}

function CardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-1 flex-col gap-2 p-4", className)} {...props} />
  );
}

function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "sheet-card-title text-base font-semibold leading-snug tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      <span>{children}</span>
    </h3>
  );
}

function CardSpecs({
  rows,
  className,
}: {
  rows: { label: string; value: React.ReactNode }[];
  className?: string;
}) {
  if (rows.length === 0) return null;
  return (
    <dl
      className={cn(
        "grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 border-t border-border/70 px-4 py-3 text-sm",
        className
      )}
    >
      {rows.map((row) => (
        <React.Fragment key={row.label}>
          <dt className="text-muted-foreground">{row.label}</dt>
          <dd className="min-w-0 text-foreground">{row.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

/** Host name of a URL, without the scheme or `www.`. */
function linkHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/(^\w+:|^)\/\//, "").replace(/\/.*$/, "");
  }
}

function CardSource({ href, className }: { href: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1 font-medium text-foreground",
        className
      )}
    >
      <span className="truncate">{linkHost(href)}</span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-brand" weight="bold" />
    </span>
  );
}

function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="absolute inset-0 z-10 rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
    />
  );
}

export {
  Card,
  CardPlate,
  CardObject,
  CardCallouts,
  CardBody,
  CardTitle,
  CardSpecs,
  CardSource,
  CardLink,
  linkHost,
};
