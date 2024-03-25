import { AdaptiveLink } from "@/components/ui/adaptive-link";
import { getTag, getTechnology } from "@/server/keystatic";
import { Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ProjectListProps {
  title: string;
  description: string;
  techStack: readonly (string | null)[];
  tags?: readonly (string | null)[];
  projectUrl: string;
}

export async function ProjectList(props: ProjectListProps) {
  const techStack = props.techStack.map(async (tech) => {
    return (await getTechnology(tech ?? "")).name ?? "";
  });

  const tags =
    props.tags &&
    props.tags.map(async (tech) => {
      return await getTag(tech ?? "");
    });

  const tagsData = tags ? await Promise.all(tags) : null;

  const techStackString = `Build with ${(await Promise.all(techStack)).join(
    ", "
  )}`;

  return (
    <div className="animate-in flex gap-4 pr-4 h-full transition relative delay-100 hover:delay-100 hover:bg-orange-100 rounded-lg group">
      <div className="bg-orange-100 rounded-lg">
        <div className="h-full transition delay-100 hover:delay-100 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-orange-500 to-orange-100 w-2 rounded-lg" />
      </div>
      <div className="flex flex-col w-full pt-4 pb-16 gap-4">
        <h3 className="font-semibold">{`${props.title}`}</h3>
        <p>{props.description}</p>
        <div className="flex flex-wrap gap-2">
          {tagsData?.map((tag) => {
            return (
              <span
                key={tag.tagName}
                className="inline-block px-3 py-1 text-xs font-semibold text-orange-300 group-hover:text-orange-500 rounded-xl border border-orange-300 group-hover:border-orange-500 bg-orange-100"
              >
                {tag.tagName}
              </span>
            );
          })}
        </div>
        <p className="text-sm text-zinc-600">{techStackString}</p>
        {props.projectUrl && (
          <AdaptiveLink
            href={props.projectUrl}
            className="flex pt-8 pb-4 gap-1 text-orange-600 group-hover:underline absolute inset-0 align-baseline pl-6"
          />
        )}
      </div>
    </div>
  );
}
