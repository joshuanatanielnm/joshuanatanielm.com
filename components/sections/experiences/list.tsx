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
      className="group grid grid-cols-1 gap-x-6 gap-y-2 py-6 sm:grid-cols-[8rem_1fr] sm:gap-y-1"
    >
      <p className="pt-0.5 font-mono text-xs uppercase tracking-wide text-muted-foreground sm:text-right">
        {props.formattedDate}
      </p>
      <div className="flex gap-4">
        {props.imageUrl ? (
          <div className="hidden h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-card sm:block">
            <Image
              src={props.imageUrl}
              alt={`${props.at} logo`}
              width={44}
              height={44}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-foreground">
            {props.title}
            <span className="text-muted-foreground"> · {props.at}</span>
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {props.description}
          </p>
          {hasUrl ? (
            <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
              {props.companyUrl.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "")}
              <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
            </span>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
}
