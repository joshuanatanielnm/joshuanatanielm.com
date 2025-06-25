import { AdaptiveLink } from "@/components/ui/adaptive-link";
import { getTag, getTechnology } from "@/server/keystatic";
import Image from "next/image";

interface ProjectListProps {
  title: string;
  description: string;
  techStack: readonly (string | null)[];
  tags?: readonly (string | null)[];
  projectUrl: string;
  imageUrl?: string;
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

      <div className="w-full">
        {/* Project Image */}
        <div className="h-60 mt-3">
          {props.imageUrl ? (
            <Image
              src={props.imageUrl}
              alt={`${props.title} project image`}
              width={400}
              height={192}
              quality={95}
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover rounded-lg border border-orange-200 filter sepia-[0.8] hue-rotate-[15deg] saturate-[0.7] group-hover:sepia-0 group-hover:hue-rotate-0 group-hover:saturate-100 transition-all duration-300 ease-in-out"
            />
          ) : null}

          {/* Fallback placeholder */}
          <div
            className={`w-full h-full rounded-lg border border-orange-200 bg-orange-50 flex items-center justify-center ${
              props.imageUrl ? "hidden" : ""
            }`}
          >
            <div className="text-orange-300 text-xs text-center">
              <div className="w-8 h-8 mx-auto mb-1 bg-orange-200 rounded"></div>
              <span>No Image</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full pt-4 pb-16 gap-4">
          <h3 className="font-semibold ">{`${props.title}`}</h3>
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
    </div>
  );
}
