import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getAbout } from "@/server/keystatic";
import { customMetadata } from "@/site.config";
import { socialLinks } from "@/app/(default)/links";
import { Reveal } from "@/components/motion/reveal";
import { NowPanel } from "./now-panel";

export async function Hero() {
  const { professionalSummary } = await getAbout();
  const isOpenToWork = process.env.NEXT_PUBLIC_IS_OPEN_TO_WORK === "true";

  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 pb-4 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-12">
      <div className="flex flex-col justify-center lg:col-span-7">
        <Reveal>
          {isOpenToWork ? (
            <Link
              href={customMetadata.emailUrl}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-medium text-brand transition-colors hover:bg-brand/15"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Available for new opportunities
            </Link>
          ) : (
            <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
              Frontend Engineer · Surabaya, Indonesia
            </span>
          )}

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, I&apos;m Joshua. I build web apps people{" "}
            <span className="text-brand">enjoy</span> using.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {professionalSummary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={customMetadata.emailUrl}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" weight="bold" />
            </Link>
            <Link
              href={customMetadata.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand"
            >
              View résumé
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {socialLinks
              .filter((link) => !link.internal)
              .map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <link.Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
          </div>
        </Reveal>
      </div>

      <div className="flex items-center lg:col-span-5">
        <Reveal delay={0.1} className="w-full">
          <NowPanel />
        </Reveal>
      </div>
    </section>
  );
}
