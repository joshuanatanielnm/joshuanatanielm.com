import { getProject } from "@/server/keystatic";
import { resolveProjectLabels } from "@/components/sections/projects/resolve-labels";
import { Reveal } from "@/components/motion/reveal";
import { WorkIndex, type WorkItem } from "@/components/sections/projects/work-index";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export async function ProjectsFeatured() {
  const projects = (await getProject()).entries;
  const selected = projects
    .filter((project) => project.link.value !== null)
    .slice(0, 4);

  const items: WorkItem[] = await Promise.all(
    selected.map(async (project) => {
      const { techLabels } = await resolveProjectLabels(
        project.techStack,
        project.tags
      );
      const url = project.link.value?.href ?? "";
      return {
        title: project.name,
        subtitle: project.subtitle,
        url,
        host: hostOf(url),
        imageUrl: project.previewUrl ?? undefined,
        tech: techLabels.slice(0, 5),
      };
    })
  );

  return (
    <Reveal className="mt-12">
      <WorkIndex items={items} />
    </Reveal>
  );
}
