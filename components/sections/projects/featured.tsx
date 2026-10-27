import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getProject } from "@/server/keystatic";
import { resolveProjectLabels } from "@/components/sections/projects/resolve-labels";
import { RevealGroup, RevealGroupItem } from "@/components/motion/reveal-group";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function joinNatural(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function ProjectRow({
  title,
  subtitle,
  url,
  imageUrl,
  tech,
}: {
  title: string;
  subtitle: string;
  url: string;
  imageUrl?: string;
  tech: string[];
}) {
  const host = hostOf(url);

  return (
    <article className="group grid grid-cols-1 gap-6 border-t border-border/70 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
      {/* The drawing: a screenshot set on the sheet, framed by a hairline and lifted a touch. */}
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
        className="relative block overflow-hidden rounded-[3px] bg-muted ring-1 ring-foreground/10 lg:col-span-7"
      >
        <div className="relative aspect-[16/10]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top"
            />
          ) : null}
        </div>
      </Link>

      <div className="flex flex-col lg:col-span-5 lg:pt-1">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-transparent decoration-[1.5px] underline-offset-[6px] transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:decoration-brand focus-visible:decoration-brand focus-visible:outline-none"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>

        <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          {tech.length > 0 ? (
            <>
              <dt className="text-muted-foreground">Built with</dt>
              <dd className="text-foreground">{joinNatural(tech)}</dd>
            </>
          ) : null}
          <dt className="text-muted-foreground">Live at</dt>
          <dd>
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand"
            >
              {host}
              <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
            </Link>
          </dd>
        </dl>
      </div>
    </article>
  );
}

export async function ProjectsFeatured() {
  const projects = (await getProject()).entries;
  const selected = projects
    .filter((project) => project.link.value !== null)
    .slice(0, 3);

  const rows = await Promise.all(
    selected.map(async (project) => {
      const { techLabels } = await resolveProjectLabels(
        project.techStack,
        project.tags
      );
      return { project, techLabels };
    })
  );

  return (
    <RevealGroup className="mt-10 border-b border-border/70">
      {rows.map(({ project, techLabels }) => (
        <RevealGroupItem key={project.name}>
          <ProjectRow
            title={project.name}
            subtitle={project.subtitle}
            url={project.link.value?.href ?? ""}
            imageUrl={project.previewUrl ?? undefined}
            tech={techLabels.slice(0, 5)}
          />
        </RevealGroupItem>
      ))}
    </RevealGroup>
  );
}
