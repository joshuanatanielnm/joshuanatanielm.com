import React, { Suspense } from "react";
import Sidebar from "./sections/sidebar";
import { AboutSection } from "@/components/sections/about";
import { Footer } from "@/components/ui/footer";
import dynamic from "next/dynamic";

// Dynamic imports with loading fallbacks
const ExperienceSection = dynamic(
  () =>
    import("@/components/sections/experiences").then(
      (mod) => mod.ExperienceSection
    ),
  {
    loading: () => (
      <div className="h-24 bg-orange-50 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);

const ProjectSection = dynamic(
  () =>
    import("@/components/sections/projects").then((mod) => mod.ProjectSection),
  {
    loading: () => (
      <div className="h-24 bg-orange-50 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);

export default async function Page() {
  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div>
        <Sidebar />
      </div>
      <div className="animate-slidein flex flex-col gap-6 lg:gap-28 lg:w-7/12 text-zinc-800 pb-20 justify-end">
        <AboutSection />
        <Suspense
          fallback={
            <div className="h-24 bg-orange-50 animate-pulse rounded-lg"></div>
          }
        >
          <ExperienceSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-24 bg-orange-50 animate-pulse rounded-lg"></div>
          }
        >
          <ProjectSection />
        </Suspense>
      </div>
      <div className="flex lg:hidden pb-14">
        <Footer />
      </div>
    </div>
  );
}
