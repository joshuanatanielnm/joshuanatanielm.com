import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsArchiveGrid } from "@/components/sections/projects/grids";
import { PageHeader } from "@/components/ui/page-header";
import { NavigationContentSkeleton } from "@/components/ui/page-skeletons";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Products, dashboards, and experiments Joshua Manuputty has built across companies and communities.",
};

export const revalidate = 3600;

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <PageHeader
        index="Archive"
        title="Projects"
        description="A fuller archive of what I've shipped: client work, open-source protocols, community sites, and personal experiments."
      />
      <Suspense fallback={<NavigationContentSkeleton />}>
        <ProjectsArchiveGrid />
      </Suspense>
    </div>
  );
}
