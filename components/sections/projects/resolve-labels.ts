import { getTag, getTechnology } from "@/server/keystatic";

export async function resolveProjectLabels(
  techStack: readonly (string | null)[],
  tags?: readonly (string | null)[]
) {
  const [techLabels, tagEntries] = await Promise.all([
    Promise.all(
      techStack.map(async (tech) => (await getTechnology(tech ?? "")).name ?? "")
    ),
    tags
      ? Promise.all(tags.map(async (tag) => getTag(tag ?? "")))
      : Promise.resolve([]),
  ]);

  return {
    techLabels,
    tagLabels: tagEntries.map((tag) => tag.tagName),
  };
}
