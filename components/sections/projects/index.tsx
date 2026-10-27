import { NavLink } from "@/components/navigation/nav-link";
import { Suspense } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProjectsFeatured } from "@/components/sections/projects/featured";
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
          title="Selected work"
          description="Three things I've shipped that I'd still put my name on. The rest are in the archive."
          action={
            <NavLink
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:decoration-brand"
            >
              Browse the archive
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5" />
            </NavLink>
          }
        />
      </Reveal>

      <Suspense
        fallback={
          <div className="mt-10">
            <MediaCardGridSkeleton count={3} />
          </div>
        }
      >
        <ProjectsFeatured />
      </Suspense>
    </section>
  );
}
