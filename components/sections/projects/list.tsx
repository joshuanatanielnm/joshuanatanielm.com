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

  const techStackString = `Build with ${(await Promise.all(techStack)).join(
    ", "
  )}`;

  return (
    <Link
      className="flex gap-4 p-4 hover:text-black hover:bg-orange-100 rounded-lg group"
      href={props.projectUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex flex-col gap-1 w-full">
        <h3 className="font-semibold">{`${props.title}`}</h3>
        <p className="pt-1">{props.description}</p>
        <p className="py-4 text-sm">{techStackString}</p>
        <div className="flex my-auto gap-1 text-orange-600 group-hover:underline">
          <Link2Icon className="my-auto" />
          {props.projectUrl.replace(/(^\w+:|^)\/\//, "")}
        </div>
      </div>
    </Link>
  );
}
