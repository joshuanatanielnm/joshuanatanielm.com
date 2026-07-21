import { fields, singleton } from "@keystatic/core";

export const nowSchema = singleton({
  label: "Now",
  path: "content/now",
  format: { data: "yaml" },
  schema: {
    location: fields.text({
      label: "Location",
      description: "Where you're based right now.",
    }),
    reading: fields.text({
      label: "Currently reading",
    }),
    playing: fields.text({
      label: "Currently playing",
    }),
    building: fields.text({
      label: "Currently building",
    }),
    listening: fields.text({
      label: "Currently listening to",
    }),
    updatedAt: fields.date({
      label: "Updated At",
      defaultValue: { kind: "today" },
    }),
  },
});
