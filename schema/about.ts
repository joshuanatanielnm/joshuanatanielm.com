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
    pageDescription: fields.text({
      label: "About Page Description",
      description: "Short intro shown at the top of the /about page.",
      multiline: true,
    }),
    homepageTeaser: fields.text({
      label: "Homepage Teaser",
      description:
        "Summary for the homepage about section. Separate paragraphs with a blank line.",
      multiline: true,
    }),
    currentCompanyName: fields.text({
      label: "Current Company",
      description: "Optional. Shown as a small badge in the hero.",
    }),
    currentCompanyUrl: fields.url({
      label: "Current Company URL",
    }),
  },
  previewUrl: `${process.env.APP_URL}/about`,
});
