import { NavLink } from "@/components/navigation/nav-link";
import { Suspense } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProjectsFeaturedGrid } from "@/components/sections/projects/grids";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaCardGridSkeleton } from "@/components/ui/page-skeletons";

export function ProjectSection() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          index="03"
          title="Selected projects"
          description="Products shipped across companies, communities, and side experiments."
          action={
            <NavLink
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand/80"
            >
              All projects
              <span className="grid h-7 w-7 place-items-center rounded-[4px] bg-brand/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" weight="bold" />
              </span>
            </NavLink>
          }
        />
      </Reveal>

      <Suspense
        fallback={
          <div className="mt-14">
            <MediaCardGridSkeleton count={3} />
          </div>
        }
      >
        <ProjectsFeaturedGrid />
      </Suspense>
    </section>
  );
}
