import React from "react";
import { links } from "../links";
import Link from "next/link";
import { getAbout } from "@/server/keystatic";
import { Footer } from "@/components/ui/footer";
import { customMetadata } from "@/site.config";

export default async function Sidebar() {
  const { professionalSummary } = await getAbout();
  return (
    <div className="lg:fixed top-14 bottom-20 lg:w-80 pt-0 lg:pt-0 flex flex-col justify-between">
      <div className=" flex flex-col text-zinc-800">
        <h1 className="text-3xl font-bold ">Joshua Manuputty</h1>
        <h1 className="text-xl py-2 ">Frontend Developer</h1>
        <p className="text-md font-light text-zinc-600">
          {professionalSummary}
        </p>
        <Link
          href={customMetadata.emailUrl}
          className="flex gap-4 transition delay-100 hover:delay-100 hover:bg-orange-100 rounded-lg group mt-8 "
        >
          <div className="bg-orange-100 rounded-lg">
            <div className="h-full transition delay-100 hover:delay-100 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-orange-500 to-orange-100 w-2 rounded-lg" />
          </div>
          <p className="py-6 text-sm text-zinc-600">Open for new opportunity</p>
        </Link>
        <div className="flex flex-wrap mt-8 max-w-2xl gap-6 text-sm">
          {links.map((link) => (
            <Link
              href={link.href}
              className="flex justify-self-center justify-items-center gap-2 hover:underline text-orange-600 group"
              key={link.label}
              target="_blank"
            >
              <link.Icon className="my-auto transition delay-100 group-hover:-translate-y-1" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden lg:flex">
        <Footer />
      </div>
    </div>
  );
}
