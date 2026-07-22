import { getSortedExperience } from "@/server/keystatic";
import { formatDateRange } from "@/utils/date";
import { format } from "date-fns";
import React from "react";
import { ExperienceList } from "./list";
import Link from "next/link";
import { customMetadata } from "@/site.config";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function ExperienceSection() {
  const experiences = await getSortedExperience();
  return (
    <section
      id="experiences"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          index="02"
          title="Where I've worked"
          description="Teams I've built with — startups, agencies, and open-source protocols."
          action={
            <Link
              href={customMetadata.resumeUrl}
              className="group inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand/80"
            >
              Full résumé
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
              </span>
            </Link>
          }
        />
      </Reveal>

      <div className="mt-14 flex flex-col border-t border-border">
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
            <StaggerReveal
              key={`${jobTitle}-${format(new Date(startDate), "yyyy-MM-dd")}`}
              index={index}
            >
              <ExperienceList
                at={companyName}
                companyUrl={redirect.value?.url ?? ""}
                description={shortDescription}
                formattedDate={formattedDate}
                title={jobTitle}
                imageUrl={companyLogo}
              />
            </StaggerReveal>
          );
        })}
      </div>
    </section>
  );
}
