import { collection, fields } from "@keystatic/core";

export const tagSchema = collection({
  label: "Tags",
  slugField: "tagName",
  path: "content/tags/*",
  schema: {
    tagName: fields.slug({
      name: {
        label: "Tag Name",
        description: "The name of the tag",
        validation: {
          length: {
            min: 1,
          },
        },
      },
    }),
    Url: fields.url({
      label: "Redirect URL",
      description: "The URL to redirect to",
    }),
  },
});
