// keystatic.config.ts
import { config } from "@keystatic/core";
import {
  aboutSchema,
  articleSchema,
  bookSchema,
  experienceSchema,
  explorationSchema,
  gameSchema,
  gearSchema,
  nowSchema,
  photoSchema,
  projectSchema,
  tagSchema,
  technologySchema,
} from "./schema";
import { defaultMetadata } from "./site.config";

const isVercelProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export default config({
  storage: isVercelProd
    ? {
        kind: "github",
        repo: {
          owner: defaultMetadata.github.username,
          name: defaultMetadata.github.repository,
        },
      }
    : {
        kind: "local",
      },
  collections: {
    articles: articleSchema,
    explorations: explorationSchema,
    experiences: experienceSchema,
    books: bookSchema,
    games: gameSchema,
    gear: gearSchema,
    photos: photoSchema,
    technologies: technologySchema,
    tags: tagSchema,
  },
  singletons: {
    about: aboutSchema,
    projects: projectSchema,
    now: nowSchema,
  },
});
