import { getProject } from "@/server/keystatic";
import { ProjectCard } from "@/components/sections/projects/list";
import { resolveProjectLabels } from "@/components/sections/projects/resolve-labels";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { RevealGroup } from "@/components/motion/reveal-group";
import { cn } from "@/utils/ui";

export async function ProjectsArchiveGrid() {
  const projects = (await getProject()).entries;

  const enriched = await Promise.all(
    projects.map(async (project) => {
      const { techLabels, tagLabels } = await resolveProjectLabels(
        project.techStack,
        project.tags
      );

      return { project, techLabels, tagLabels };
    })
  );

  return (
    <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:items-start lg:gap-6">
      {enriched.map(({ project, techLabels, tagLabels }, index) => {
        const featured = index === 0;

        return (
          <StaggerReveal
            key={project.name}
            index={index}
            className={cn(
              featured && "sm:col-span-2 lg:col-span-7",
              !featured && index <= 2 && "lg:col-span-5",
              index > 2 && "lg:col-span-6"
            )}
          >
            <ProjectCard
              description={project.subtitle}
              projectUrl={project.link.value?.href ?? ""}
              techLabels={techLabels}
              tagLabels={tagLabels}
              title={project.name}
              imageUrl={project.previewUrl ?? ""}
              featured={featured}
            />
          </StaggerReveal>
        );
      })}
    </RevealGroup>
  );
}

export async function ProjectsFeaturedGrid() {
  const projects = (await getProject()).entries;
  const selectedProjects = projects
    .filter((project) => project.link.value !== null)
    .slice(0, 3);

  const enriched = await Promise.all(
    selectedProjects.map(async (project) => {
      const { techLabels, tagLabels } = await resolveProjectLabels(
        project.techStack,
        project.tags
      );

      return { project, techLabels, tagLabels };
    })
  );

  return (
    <RevealGroup className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start lg:gap-6">
      {enriched.map(({ project, techLabels, tagLabels }, index) => {
        const featured = index === 0;

        return (
          <StaggerReveal
            key={project.name}
            index={index}
            className={cn(
              featured
                ? "lg:col-span-7 lg:row-span-2"
                : "lg:col-span-5 lg:col-start-8"
            )}
          >
            <ProjectCard
              description={project.subtitle}
              projectUrl={project.link.value?.href ?? ""}
              techLabels={techLabels}
              tagLabels={tagLabels}
              title={project.name}
              imageUrl={project.previewUrl ?? ""}
              featured={featured}
            />
          </StaggerReveal>
        );
      })}
    </RevealGroup>
  );
}
