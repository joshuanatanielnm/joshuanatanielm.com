// keystatic.config.ts
import { config } from "@keystatic/core";
import {
  aboutSchema,
  articleSchema,
  experienceSchema,
  explorationSchema,
  projectSchema,
} from "./schema";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    articles: articleSchema,
    explorations: explorationSchema,
    experiences: experienceSchema,
  },
  singletons: {
    about: aboutSchema,
    projects: projectSchema,
  },
});
