import { collection, fields } from "@keystatic/core";

export const explorationSchema = collection({
  label: "Explorations",
  slugField: "title",
  path: "content/explorations/*",
  entryLayout: "content",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({
      name: {
        label: "Title",
        description: "The title of the exploration",
        validation: {
          length: {
            min: 1,
          },
        },
      },
    }),
    description: fields.text({
      label: "Description",
      description: "The description of the exploration",
      validation: {
        length: {
          min: 1,
        },
      },
    }),
    publishedAt: fields.date({
      label: "Published At",
      description: "The date the exploration was published",
      defaultValue: { kind: "today" },
      validation: {
        isRequired: true,
      },
    }),
    updatedAt: fields.date({
      label: "Updated At",
      description: "The date the exploration was updated",
      validation: {
        isRequired: false,
      },
    }),
    draft: fields.checkbox({
      label: "Mark as draft",
      description:
        "If enabled, the exploration will not be listed on the site but can still be accessed via the URL",
      defaultValue: false,
    }),
    redirect: fields.conditional(
      fields.checkbox({
        label: "Redirect to external URL",
        description:
          "If enabled, the exploration will redirect to an external URL",
        defaultValue: false,
      }),
      {
        false: fields.empty(),
        true: fields.object({
          url: fields.url({
            label: "Redirect URL",
            description: "The URL to redirect to",
            validation: {
              isRequired: true,
            },
          }),
        }),
      }
    ),
    content: fields.document({
      label: "Content",
      description: "The content of the exploration",
      formatting: true,
      dividers: true,
      links: true,
      images: {
        directory: "public/assets/explorations",
        publicPath: "/assets/explorations",
      },
      layouts: [[1], [1, 1], [1, 2], [2, 1]],
    }),
  },
  previewUrl: `${process.env.APP_URL}/explorations/{slug}`,
});
