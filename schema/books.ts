import { collection, fields } from "@keystatic/core";

export const bookSchema = collection({
  label: "Books",
  slugField: "title",
  path: "content/books/*",
  schema: {
    title: fields.slug({
      name: {
        label: "Title",
        validation: { length: { min: 1 } },
      },
    }),
    author: fields.text({
      label: "Author",
      validation: { length: { min: 1 } },
    }),
    coverUrl: fields.url({
      label: "Cover Image URL",
      description:
        "TODO: replace placeholder cover with a real book cover image URL.",
    }),
    status: fields.select({
      label: "Status",
      options: [
        { label: "Reading", value: "reading" },
        { label: "Finished", value: "finished" },
        { label: "Want to read", value: "want-to-read" },
      ],
      defaultValue: "finished",
    }),
    rating: fields.integer({
      label: "Rating (0-5)",
      description: "Optional personal rating out of 5.",
    }),
    finishedDate: fields.date({
      label: "Finished Date",
      validation: { isRequired: false },
    }),
    link: fields.url({
      label: "Link",
      description: "Optional link (Goodreads, publisher, etc.).",
    }),
    note: fields.text({
      label: "Note",
      description: "A short personal takeaway.",
      multiline: true,
    }),
    featured: fields.checkbox({
      label: "Featured",
      description: "Highlight this book on the home page.",
      defaultValue: false,
    }),
  },
});
