import { getAbout } from "@/server/keystatic";
import React from "react";
import { getBasicRenderers } from "@/components/keystatic/basic-renderer";
import { DocumentRenderer } from "@keystatic/core/renderer";

export async function AboutSection() {
  const { content } = await getAbout();
  const aboutContent = await content();
  const renderers = getBasicRenderers();
  return (
    <section className="flex flex-col gap-6 pt-12 text-base" id="about">
      <h3 className="text-xl font-bold lg:hidden">About</h3>
      <DocumentRenderer document={aboutContent} renderers={renderers} />
    </section>
  );
}
