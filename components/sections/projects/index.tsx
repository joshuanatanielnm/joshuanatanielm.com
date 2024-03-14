import { getProject } from "@/server/keystatic";
import React from "react";
import { ProjectList } from "./list";
import Link from "next/link";
import { customMetadata } from "@/site.config";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export async function ProjectSection() {
  const projects = (await getProject()).entries;
  const selectedProjects = projects
    .filter((project) => project.link.value !== null)
    .slice(0, 3);
  return (
    <section className="flex flex-col gap-10 pt-12" id="projects">
      <h3 className="text-xl font-bold lg:hidden">Projects</h3>
      {selectedProjects.map((project) => {
        return (
          <ProjectList
            description={project.subtitle}
            projectUrl={project.link.value?.href ?? ""}
            techStack={project.techStack}
            title={project.name}
            key={project.name}
          />
        );
      })}
      <Link
        href={`${customMetadata.githubUrl}?tab=repositories`}
        className="flex my-auto pt-4 gap-1 text-orange-600 hover:underline group"
        rel="noopener noreferrer"
        target="_blank"
      >
        {"Other Projects and Explorations"}
        <ArrowRightIcon className="my-auto transition delay-75 group-hover:translate-x-2" />
      </Link>
    </section>
  );
}
