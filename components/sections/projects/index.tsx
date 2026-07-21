import { getProject } from "@/server/keystatic";
import React from "react";
import { ProjectCard } from "./list";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function ProjectSection() {
  const projects = (await getProject()).entries;
  const selectedProjects = projects
    .filter((project) => project.link.value !== null)
    .slice(0, 3);

  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
      <Reveal>
        <SectionHeading
          title="Selected projects"
          description="Products I've shipped across companies, communities, and side experiments."
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand/80"
            >
              All projects
              <ArrowRight className="h-4 w-4" weight="bold" />
            </Link>
          }
        />
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selectedProjects.map((project, index) => (
          <Reveal key={project.name} delay={Math.min(index * 0.06, 0.2)}>
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
    </section>
  );
}
