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

export const getTag = cache(getReader().collections.tags.readOrThrow);

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

export const getNow = cache(getReader().singletons.now.read);

export const getBooks = cache(async () => {
  const reader = getReader();
  return reader.collections.books.all();
});

export const getGames = cache(async () => {
  const reader = getReader();
  return reader.collections.games.all();
});

export const getPhotos = cache(async () => {
  const reader = getReader();
  return reader.collections.photos.all();
});

export const getLifePhotos = cache(async () => {
  const photos = await getPhotos();
  return photos
    .filter((photo) => photo.entry.category === "life" && photo.entry.imageUrl)
    .sort((a, b) => {
      const aDate = a.entry.takenDate ?? "";
      const bDate = b.entry.takenDate ?? "";
      return bDate.localeCompare(aDate);
    });
});

export const getGear = cache(async () => {
  const reader = getReader();
  return reader.collections.gear.all();
});
