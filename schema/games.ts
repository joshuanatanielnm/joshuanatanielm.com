import { collection, fields } from "@keystatic/core";

export const gameSchema = collection({
  label: "Games",
  slugField: "title",
  path: "content/games/*",
  schema: {
    title: fields.slug({
      name: {
        label: "Title",
        validation: { length: { min: 1 } },
      },
    }),
    coverUrl: fields.url({
      label: "Cover Image URL",
      description:
        "TODO: replace placeholder cover with a real game key art / cover URL.",
    }),
    platform: fields.select({
      label: "Platform",
      options: [
        { label: "PC", value: "pc" },
        { label: "PlayStation", value: "playstation" },
        { label: "Nintendo Switch", value: "switch" },
        { label: "Xbox", value: "xbox" },
        { label: "Mobile", value: "mobile" },
      ],
      defaultValue: "pc",
    }),
    status: fields.select({
      label: "Status",
      options: [
        { label: "Playing", value: "playing" },
        { label: "Finished", value: "finished" },
        { label: "Backlog", value: "backlog" },
        { label: "Wishlist", value: "wishlist" },
      ],
      defaultValue: "finished",
    }),
    rating: fields.integer({
      label: "Rating (0-5)",
    }),
    hours: fields.integer({
      label: "Hours Played",
    }),
    link: fields.url({
      label: "Link",
      description: "Optional store or info link.",
    }),
    note: fields.text({
      label: "Note",
      description: "What you liked (or didn't).",
      multiline: true,
    }),
    featured: fields.checkbox({
      label: "Featured",
      defaultValue: false,
    }),
  },
});
