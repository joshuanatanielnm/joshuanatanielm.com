import { getTechnology } from "@/server/keystatic";
import { Link2Icon } from "@radix-ui/react-icons";
import { te } from "date-fns/locale";
import Link from "next/link";

interface ProjectListProps {
  title: string;
  description: string;
  techStack: readonly (string | null)[];
  projectUrl: string;
}

export async function ProjectList(props: ProjectListProps) {
  const techStack = props.techStack.map(async (tech) => {
    return (await getTechnology(tech ?? "")).name ?? "";
  });

  const handleStringLimit = (str: string, limit: number) => {
    if (str.length > limit) {
      return str.substring(0, limit) + "...";
    }
    return str;
  };

  const techStackString = `Build with ${(await Promise.all(techStack)).join(
    ", "
  )}`;

  return (
    <Link
      className="flex gap-4 pr-4 transition delay-100 hover:delay-100 hover:bg-orange-100 rounded-lg group"
      href={props.projectUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="bg-orange-100 rounded-lg">
        <div className="h-full transition delay-100 hover:delay-100 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-orange-500 to-orange-100 w-2 rounded-lg" />
      </div>
      <div className="flex flex-col w-full py-4 gap-4">
        <h3 className="font-semibold">{`${props.title}`}</h3>
        <p>{props.description}</p>
        <p className="text-sm text-zinc-600">{techStackString}</p>
        <div className="flex my-auto gap-1 text-orange-600 group-hover:underline">
          <Link2Icon className="my-auto" />
          <p className="flex md:hidden">
            {handleStringLimit(
              props.projectUrl.replace(/(^\w+:|^)\/\//, ""),
              25
            )}
          </p>
          <p className="hidden md:flex">
            {props.projectUrl.replace(/(^\w+:|^)\/\//, "")}
          </p>
        </div>
      </div>
    </Link>
  );
}
