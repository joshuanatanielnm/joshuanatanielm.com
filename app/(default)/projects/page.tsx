import type { Metadata } from "next";
import { ProjectCard } from "@/components/sections/projects/list";
import { getProject } from "@/server/keystatic";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Products, dashboards, and experiments Joshua Manuputty has built across companies and communities.",
};

export default async function Page() {
  const projects = (await getProject()).entries;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <PageHeader
        title="Projects"
        description="A fuller archive of what I've shipped: client work, open-source protocols, community sites, and personal experiments."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={Math.min(index * 0.04, 0.24)}>
            <ProjectCard
              className="h-full"
              description={project.subtitle}
              projectUrl={project.link.value?.href ?? ""}
              techStack={project.techStack}
              title={project.name}
              tags={project.tags}
              imageUrl={project.previewUrl ?? ""}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
