import { getSortedExperience } from "@/server/keystatic";
import { formatDateRange } from "@/utils/date";
import { format } from "date-fns";
import React from "react";
import { ExperienceList } from "./list";
import Link from "next/link";
import { customMetadata } from "@/site.config";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function ExperienceSection() {
  const experiences = await getSortedExperience();
  return (
    <section
      id="experiences"
      className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16"
    >
      <Reveal>
        <SectionHeading
          title="Where I've worked"
          description="A few of the teams I've been grateful to build with, from startups and agencies to open-source protocols."
          action={
            <Link
              href={customMetadata.resumeUrl}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand/80"
            >
              Full résumé
              <ArrowUpRight className="h-4 w-4" weight="bold" />
            </Link>
          }
        />
      </Reveal>

      <div className="mt-10 flex flex-col divide-y divide-border border-t border-border">
        {experiences.map((experience, index) => {
          const {
            companyName,
            companyLogo,
            jobTitle,
            startDate,
            endDate,
            redirect,
            shortDescription,
          } = experience.entry;
          const formattedDate = formatDateRange({ startDate, endDate });
          return (
            <Reveal
              key={`${jobTitle}-${format(new Date(startDate), "yyyy-MM-dd")}`}
              delay={Math.min(index * 0.04, 0.2)}
            >
              <ExperienceList
                at={companyName}
                companyUrl={redirect.value?.url ?? ""}
                description={shortDescription}
                formattedDate={formattedDate}
                title={jobTitle}
                imageUrl={companyLogo}
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
