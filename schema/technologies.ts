import { collection, fields } from "@keystatic/core";

export const technologySchema = collection({
  label: "Technologies",
  slugField: "name",
  path: "content/technologies/*",
  schema: {
    iconUrl: fields.image({
      label: "Icon",
      description: "The icon for the project",
      directory: "public/assets/technologies",
      publicPath: "/assets/technologies",
      validation: {
        isRequired: false,
      },
    }),
    name: fields.text({
      label: "Technology name",
      validation: {
        length: {
          min: 1,
        },
      },
    }),
    url: fields.url({
      label: "Technology Website URL",
      description: "The URL to redirect to",
      validation: {
        isRequired: true,
      },
    }),
  },
});
