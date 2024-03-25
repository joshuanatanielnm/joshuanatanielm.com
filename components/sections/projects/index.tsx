import { getProject } from "@/server/keystatic";
import React from "react";
import { ProjectList } from "./list";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export async function ProjectSection() {
  const projects = (await getProject()).entries;
  const selectedProjects = projects
    .filter((project) => project.link.value !== null)
    .slice(0, 3);
  return (
    <section className="flex flex-col gap-10 pt-12" id="projects">
      <div>
        <h3 className="text-xl font-bold ">Projects</h3>
        <p className="pt-2 text-sm text-zinc-600">
          Here are some of the projects that I have worked on my previous
          companies, personal projects, and explorations as well.
        </p>
      </div>
      {selectedProjects.map((project) => {
        return (
          <ProjectList
            description={project.subtitle}
            projectUrl={project.link.value?.href ?? ""}
            techStack={project.techStack}
            title={project.name}
            key={project.name}
            tags={project.tags}
          />
        );
      })}
      <Link
        href={`/projects`}
        className="flex my-auto pt-4 gap-1 text-orange-600 hover:underline group"
      >
        {"Other Projects and Explorations"}
        <ArrowRightIcon className="my-auto transition delay-75 group-hover:translate-x-2" />
      </Link>
    </section>
  );
}
