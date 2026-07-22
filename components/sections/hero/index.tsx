import { Suspense } from "react";
import { getAbout } from "@/server/keystatic";
import { Reveal } from "@/components/motion/reveal";
import { HeroBackdrop } from "@/components/three/hero-canvas";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroIntro } from "./hero-intro";
import { NowPanel } from "./now-panel";

function HeroSkeleton() {
  return (
    <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
      <div className="space-y-6 lg:col-span-7">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-16 w-full max-w-lg" />
        <Skeleton className="h-16 w-full max-w-md" />
        <Skeleton className="h-5 w-full max-w-md" />
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
      <Skeleton className="h-[22rem] w-full rounded-[2rem] lg:col-span-5" />
    </div>
  );
}

async function HeroContent() {
  const about = await getAbout();
  const isOpenToWork = process.env.NEXT_PUBLIC_IS_OPEN_TO_WORK === "true";

  return (
    <>
      <div className="lg:col-span-7">
        <HeroIntro
          professionalSummary={about.professionalSummary}
          isOpenToWork={isOpenToWork}
          currentCompanyName={about.currentCompanyName}
          currentCompanyUrl={about.currentCompanyUrl}
        />
      </div>
      <div className="lg:col-span-5">
        <Reveal delay={0.12} className="w-full">
          <NowPanel />
        </Reveal>
      </div>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col overflow-hidden border-b border-border/60 lg:min-h-[100dvh]">
      <HeroBackdrop />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-6 lg:py-24">
        <Suspense fallback={<HeroSkeleton />}>
          <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <HeroContent />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
