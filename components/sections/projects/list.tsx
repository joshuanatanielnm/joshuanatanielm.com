import { getTag, getTechnology } from "@/server/keystatic";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/ui";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: readonly (string | null)[];
  tags?: readonly (string | null)[];
  projectUrl: string;
  imageUrl?: string;
  className?: string;
}

export async function ProjectCard(props: ProjectCardProps) {
  const techStack = await Promise.all(
    props.techStack.map(async (tech) => (await getTechnology(tech ?? "")).name ?? "")
  );

  const tagsData = props.tags
    ? await Promise.all(props.tags.map((tag) => getTag(tag ?? "")))
    : [];

  const hasUrl = Boolean(props.projectUrl);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40",
        props.className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {props.imageUrl ? (
          <Image
            src={props.imageUrl}
            alt={`${props.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-3xl font-semibold text-muted-foreground/40">
              {props.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium leading-tight text-foreground">
            {props.title}
          </h3>
          {hasUrl ? (
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
              weight="bold"
            />
          ) : null}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {props.description}
        </p>

        {tagsData.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tagsData.slice(0, 3).map((tag) => (
              <Badge key={tag.tagName} variant="muted">
                {tag.tagName}
              </Badge>
            ))}
          </div>
        ) : null}

        <p className="mt-auto pt-2 font-mono text-xs text-muted-foreground">
          {techStack.slice(0, 4).join(" · ")}
          {techStack.length > 4 ? " · …" : ""}
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
  );
}
