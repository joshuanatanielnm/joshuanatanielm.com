import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experiences";
import { ProjectSection } from "@/components/sections/projects";
import { ShelfSection } from "@/components/sections/shelf";
import { ContactSection } from "@/components/sections/contact";
import { HomeSectionSkeleton } from "@/components/ui/page-skeletons";

export default function Page() {
  return (
    <>
      <Hero />
      <Suspense fallback={<HomeSectionSkeleton />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<HomeSectionSkeleton />}>
        <ExperienceSection />
      </Suspense>
      <ProjectSection />
      <Suspense fallback={<HomeSectionSkeleton />}>
        <ShelfSection />
      </Suspense>
      <ContactSection />
    </>
  );
}
