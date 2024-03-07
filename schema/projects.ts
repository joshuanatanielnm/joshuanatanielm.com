import { fields, singleton } from "@keystatic/core";

export const projectSchema = singleton({
  label: "Projects",
  path: "content/projects",
  format: "json",
  schema: {
    entries: fields.array(
      fields.object({
        previewUrl: fields.image({
          label: "Preview Image",
          description: "The Preview for the project",
          directory: "public/assets/projects",
          publicPath: "/assets/projects",
          validation: {
            isRequired: false,
          },
        }),
        name: fields.text({
          label: "Name",
          description: "The name of the project",
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        description: fields.document({
          label: "Description",
          description: "The description of the project",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/assets/projects",
            publicPath: "/assets/projects",
          },
          layouts: [[1], [1, 1], [1, 2], [2, 1]],
        }),
        subtitle: fields.text({
          label: "Subtitle",
          description: "The subtitle of the project",
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        techStack: fields.array(
          fields.relationship({
            label: "Tech Stack",
            collection: "technologies",
          }),
          {
            label: "Technology Name",
            itemLabel: (props: any) => props.value,
          }
        ),
        tags: fields.array(
          fields.relationship({
            label: "Project Tags",
            collection: "tags",
          }),
          {
            label: "Tag",
            itemLabel: (props: any) => props.value,
          }
        ),
        link: fields.conditional(
          fields.checkbox({
            label: "Include project link",
            description: "Whether to include a link to the project",
          }),
          {
            false: fields.empty(),
            true: fields.object({
              href: fields.url({
                label: "Project URL",
                description: "The URL of the project",
                validation: {
                  isRequired: true,
                },
              }),
              label: fields.text({
                label: "Project URL Label",
                description: "The label for the project URL",
              }),
            }),
          }
        ),
      }),
      {
        label: "Project entries",
        description:
          "List of projects (see https://github.com/Thinkmill/keystatic/discussions/459)",
        itemLabel: (props) => props.fields.name.value,
      }
    ),
  },
  previewUrl: `${process.env.APP_URL}/projects`,
});
