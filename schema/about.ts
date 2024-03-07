import { fields, singleton } from "@keystatic/core";

export const aboutSchema = singleton({
  label: "About",
  path: "content/about",
  entryLayout: "content",
  format: {
    contentField: "content",
  },
  schema: {
    cover: fields.image({
      label: "Cover",
      directory: "public/assets/about",
      publicPath: "/assets/about",
    }),
    content: fields.document({
      label: "Content",
      dividers: true,
      formatting: true,
      links: true,
      images: {
        directory: "public/assets/about",
        publicPath: "/assets/about",
      },
      layouts: [[1], [1, 1], [1, 2], [2, 1]],
    }),
    professionalSummary: fields.text({
      label: "Professional Summary",
      multiline: true,
      validation: {
        length: { min: 1 },
      },
    }),
  },
  previewUrl: `${process.env.APP_URL}/about`,
});
