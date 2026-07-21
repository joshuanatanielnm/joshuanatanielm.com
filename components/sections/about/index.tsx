import { getAbout } from "@/server/keystatic";
import React from "react";
import { getBasicRenderers } from "@/components/keystatic/basic-renderer";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function AboutSection() {
  const { content } = await getAbout();
  const aboutContent = await content();
  const renderers = getBasicRenderers();
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
      <Reveal className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading title="A bit about me" />
        </div>
        <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed text-muted-foreground dark:prose-invert prose-p:my-0 prose-a:font-medium lg:col-span-8 [&>p]:mb-4 [&>p:last-child]:mb-0">
          <DocumentRenderer document={aboutContent} renderers={renderers} />
        </div>
      </Reveal>
    </section>
  );
}
