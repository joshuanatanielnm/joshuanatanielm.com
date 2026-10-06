import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/ui";

export interface ProjectCardProps {
  title: string;
  description: string;
  techLabels: string[];
  tagLabels?: string[];
  projectUrl: string;
  imageUrl?: string;
  className?: string;
  featured?: boolean;
}

export function ProjectCard(props: ProjectCardProps) {
  const hasUrl = Boolean(props.projectUrl);

  return (
    <div
      className={cn(
        "rounded-lg bg-foreground/[0.03] p-1.5",
        props.className
      )}
    >
      <article className="group relative flex flex-col overflow-hidden rounded-[calc(0.5rem-1px)] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {props.imageUrl ? (
            <Image
              src={props.imageUrl}
              alt={`${props.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-condensed text-3xl font-semibold text-muted-foreground/40">
                {props.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={cn(
                "font-medium leading-tight tracking-tight text-foreground",
                props.featured ? "text-lg sm:text-xl" : "text-base"
              )}
            >
              {props.title}
            </h3>
            {hasUrl ? (
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[4px] bg-secondary text-muted-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:bg-brand/10 group-hover:text-brand">
                <ArrowUpRight className="h-4 w-4" weight="bold" />
              </span>
            ) : null}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {props.description}
          </p>

          {props.tagLabels && props.tagLabels.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {props.tagLabels.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="muted">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}

          <p className="border-t border-border/60 pt-3 font-condensed text-xs text-muted-foreground">
            {props.techLabels.slice(0, 4).join(" · ")}
            {props.techLabels.length > 4 ? " · …" : ""}
          </p>
        </div>

        {hasUrl ? (
          <Link
            href={props.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
            aria-label={`Open ${props.title}`}
          >
            <span className="sr-only">Open {props.title}</span>
          </Link>
        ) : null}
      </article>
    </div>
  );
}
