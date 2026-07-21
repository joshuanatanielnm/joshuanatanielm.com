import React, { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experiences";
import { ProjectSection } from "@/components/sections/projects";
import { ShelfSection } from "@/components/sections/shelf";
import { ContactSection } from "@/components/sections/contact";

function SectionFallback() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="h-40 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="h-px bg-border" />
    </div>
  );
}

export default async function Page() {
  return (
    <>
      <Hero />
      <Divider />
      <AboutSection />
      <Divider />
      <Suspense fallback={<SectionFallback />}>
        <ExperienceSection />
      </Suspense>
      <Divider />
      <Suspense fallback={<SectionFallback />}>
        <ProjectSection />
      </Suspense>
      <Divider />
      <Suspense fallback={<SectionFallback />}>
        <ShelfSection />
      </Suspense>
      <Divider />
      <ContactSection />
    </>
  );
}
