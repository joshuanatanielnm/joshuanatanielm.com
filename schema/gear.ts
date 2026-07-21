import { collection, fields } from "@keystatic/core";

export const gearSchema = collection({
  label: "Gear",
  slugField: "name",
  path: "content/gear/*",
  schema: {
    name: fields.slug({
      name: {
        label: "Name",
        validation: { length: { min: 1 } },
      },
    }),
    category: fields.select({
      label: "Category",
      options: [
        { label: "Computer", value: "computer" },
        { label: "Display", value: "display" },
        { label: "Desk & Chair", value: "desk" },
        { label: "Peripherals", value: "input" },
        { label: "Audio", value: "audio" },
        { label: "Mobile", value: "mobile" },
        { label: "Software", value: "software" },
        { label: "Other", value: "other" },
      ],
      defaultValue: "computer",
    }),
    description: fields.text({
      label: "Description",
      description: "A short note on why you use it.",
      multiline: true,
    }),
    link: fields.url({
      label: "Link",
      description: "Optional product or info link.",
    }),
    featured: fields.checkbox({
      label: "Featured",
      description: "Highlight this item at the top of its category.",
      defaultValue: false,
    }),
  },
});
