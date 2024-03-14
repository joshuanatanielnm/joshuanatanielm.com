import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Link2Icon } from "@radix-ui/react-icons";

interface ExperienceListProps {
  formattedDate: string;
  title: string;
  at: string;
  companyUrl: string;
  imageUrl?: string | null;
  description: string;
}

export function ExperienceList(props: ExperienceListProps) {
  return (
    <Link
      className="flex gap-4 pr-4 transition delay-100 hover:delay-100 hover:bg-orange-100 rounded-lg group"
      href={props.companyUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="bg-orange-100 rounded-lg">
        <div className="h-full transition delay-100 hover:delay-100 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-orange-500 to-orange-100 w-2 rounded-lg" />
      </div>
      <div className="py-4 flex gap-4">
        <div className="hidden md:flex">
          <div className="rounded-full overflow-hidden w-10 relative">
            {props.imageUrl && (
              <Image
                src={props.imageUrl}
                alt={`/${props.at} logo`}
                width={50}
                height={50}
                className="object-cover mix-blend-multiply"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h3 className="font-semibold">{`${props.title} at ${props.at}`}</h3>
          <p>{props.formattedDate}</p>
          <p className="pt-1 text-zinc-600">{props.description}</p>
          <div className="flex my-auto pt-4 gap-1 text-orange-600 group-hover:underline">
            <Link2Icon className="my-auto" />
            {props.companyUrl.replace(/(^\w+:|^)\/\//, "")}
          </div>
        </div>
      </div>
    </Link>
  );
}
