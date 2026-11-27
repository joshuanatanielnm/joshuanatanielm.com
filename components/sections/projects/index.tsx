import { NavLink } from "@/components/navigation/nav-link";
import { Suspense, type CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  FEATURED_COUNT,
  ProjectsFeatured,
} from "@/components/sections/projects/featured";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaCardGridSkeleton } from "@/components/ui/page-skeletons";

export function ProjectSection() {
  return (
    // On screens that fit it, the section pins: the track below is taller than
    // the viewport, the content sticks for the difference, and WorkIndex turns
    // that scroll distance into stepping through the projects.
    <section
      id="projects"
      data-work-pin
      style={{ "--work-steps": FEATURED_COUNT } as CSSProperties}
      className="scroll-mt-24 pin:h-[calc(100dvh_+_var(--work-steps)_*_45vh)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 pin:sticky pin:top-0 pin:flex pin:h-[100dvh] pin:flex-col pin:justify-center pin:py-10">
        <Reveal>
          <SectionHeading
            title="Selected work"
            description="A few things I've shipped and would still put my name on."
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
      </div>
    </section>
  );
}
