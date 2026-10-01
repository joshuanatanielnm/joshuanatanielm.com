import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

interface ExperienceListProps {
  formattedDate: string;
  title: string;
  at: string;
  companyUrl: string;
  imageUrl?: string | null;
  description: string;
}

export function ExperienceList(props: ExperienceListProps) {
  const hasUrl = Boolean(props.companyUrl);
  const Wrapper = hasUrl ? Link : "div";
  const wrapperProps = hasUrl
    ? {
        href: props.companyUrl,
        rel: "noopener noreferrer",
        target: "_blank",
      }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="group grid grid-cols-1 gap-x-8 gap-y-3 border-b border-border py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[10rem_1fr] sm:gap-y-1"
    >
      <p className="pt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:text-right">
        {props.formattedDate}
      </p>
      <div className="flex gap-4">
        {props.imageUrl ? (
          <div className="hidden h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-card p-0.5 sm:block">
            <div className="h-full w-full overflow-hidden rounded-[calc(1rem-0.125rem)]">
              <Image
                src={props.imageUrl}
                alt={`${props.at} logo`}
                width={48}
                height={48}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-medium tracking-tight text-foreground">
            {props.title}
            <span className="text-muted-foreground"> · {props.at}</span>
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {props.description}
          </p>
          {hasUrl ? (
            <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-brand opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 group-focus-within:opacity-100">
              {props.companyUrl.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "")}
              <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
            </span>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
}
