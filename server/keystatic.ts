import "server-only";

import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { cache } from "react";

export const getReader = cache(() =>
  createReader(process.cwd(), keystaticConfig)
);

export const getExperience = cache(
  getReader().collections.experiences.readOrThrow
);

export const getTechnology = cache(
  getReader().collections.technologies.readOrThrow
);

export const getSortedExperience = cache(async () => {
  const reader = getReader();
  const experiences = await reader.collections.experiences.all();
  // https://github.com/Thinkmill/keystatic/discussions/406
  const sortedExperiences = experiences.sort((a, b) => {
    const aDate = new Date(a.entry.endDate ?? new Date());
    const bDate = new Date(b.entry.endDate ?? new Date());
    if (aDate < bDate) return 1;
    if (aDate > bDate) return -1;
    return 0;
  });
  return sortedExperiences;
});

export const getProject = cache(getReader().singletons.projects.readOrThrow);

export const getAbout = cache(getReader().singletons.about.readOrThrow);
