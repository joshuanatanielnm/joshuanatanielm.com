import { collection, fields } from "@keystatic/core";

export const experienceSchema = collection({
  label: "Experiences",
  slugField: "jobTitle",
  path: "content/articles/*",
  schema: {
    jobTitle: fields.slug({
      name: {
        label: "Job Title",
        description: "The title of the position",
        validation: {
          length: {
            min: 1,
          },
        },
      },
    }),
    description: fields.text({
      label: "Description",
      description: "The description of the position",
      validation: {
        length: {
          min: 1,
        },
      },
    }),
    startDate: fields.date({
      label: "Start Date",
      description: "The start date of the position",
      defaultValue: { kind: "today" },
      validation: {
        isRequired: true,
      },
    }),
    endDate: fields.date({
      label: "End Date",
      description: "The end date of the position",
      validation: {
        isRequired: false,
      },
    }),
    draft: fields.checkbox({
      label: "Mark as draft",
      description:
        "If enabled, the article will not be listed on the site but can still be accessed via the URL",
      defaultValue: false,
    }),
    redirect: fields.conditional(
      fields.checkbox({
        label: "Redirect to external URL",
        description: "If enabled, the article will redirect to an external URL",
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
    techStack: fields.array(
      fields.text({
        label: "Technology Name",
      })
    ),
    projects: fields.array(
      fields.object({
        projectName: fields.text({
          label: "Project Name",
        }),
        projectUrl: fields.url({
          label: "Project Url",
        }),
      })
    ),
  },
});
