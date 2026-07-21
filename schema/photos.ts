import { collection, fields } from "@keystatic/core";

export const photoSchema = collection({
  label: "Photos",
  slugField: "title",
  path: "content/photos/*",
  schema: {
    title: fields.slug({
      name: {
        label: "Caption",
        validation: { length: { min: 1 } },
      },
    }),
    imageUrl: fields.url({
      label: "Image URL",
      description:
        "TODO: replace placeholder with a real photo URL (or migrate to an image upload field).",
    }),
    location: fields.text({
      label: "Location",
    }),
    takenDate: fields.date({
      label: "Taken Date",
      validation: { isRequired: false },
    }),
    orientation: fields.select({
      label: "Orientation",
      description: "Controls how the photo spans the gallery grid.",
      options: [
        { label: "Landscape", value: "landscape" },
        { label: "Portrait", value: "portrait" },
        { label: "Square", value: "square" },
      ],
      defaultValue: "landscape",
    }),
    category: fields.select({
      label: "Category",
      description:
        "Journal photos show on /photos. Setup photos show on the /setup page.",
      options: [
        { label: "Journal", value: "journal" },
        { label: "Setup", value: "setup" },
      ],
      defaultValue: "journal",
    }),
    featured: fields.checkbox({
      label: "Featured",
      defaultValue: false,
    }),
  },
});
