// keystatic.config.ts
import { config } from "@keystatic/core";
import {
  aboutSchema,
  articleSchema,
  experienceSchema,
  explorationSchema,
  projectSchema,
  tagSchema,
  technologySchema,
} from "./schema";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    articles: articleSchema,
    explorations: explorationSchema,
    experiences: experienceSchema,
    technologies: technologySchema,
    tags: tagSchema,
  },
  singletons: {
    about: aboutSchema,
    projects: projectSchema,
  },
});
