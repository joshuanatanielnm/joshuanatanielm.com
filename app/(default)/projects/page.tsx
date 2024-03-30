import { ProjectList } from "@/components/sections/projects/list";
import { getProject } from "@/server/keystatic";

export default async function Page() {
  const projects = (await getProject()).entries;

  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold ">Projects</h3>
        <p className="pt-2 text-md text-zinc-600 w-full md:w-3/4 lg:w-1/2">
          Here are some of the projects that I have worked on my previous
          companies, personal projects, and explorations as well.
        </p>
      </div>
      <div className="animate-slidein pt-12 flex flex-wrap gap-10 justify-between">
        {projects.map((project) => {
          return (
            <div
              key={project.name}
              className="w-full lg:w-[47.9%] h-auto transition delay-100 before:transition-[opacity,inset]"
            >
              <ProjectList
                description={project.subtitle}
                projectUrl={project.link.value?.href ?? ""}
                techStack={project.techStack}
                title={project.name}
                tags={project.tags}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
