import { Suspense } from "react";
import { getAbout } from "@/server/keystatic";
import { HeroBackdrop } from "@/components/three/hero-canvas";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroIntro } from "./hero-intro";

function HeroSkeleton() {
  return (
    <div className="w-full max-w-4xl space-y-6">
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-24 w-full max-w-xl" />
      <Skeleton className="h-14 w-full max-w-md" />
      <Skeleton className="h-5 w-full max-w-xl" />
      <Skeleton className="h-12 w-40 rounded-md" />
    </div>
  );
}

async function HeroContent() {
  const about = await getAbout();
  const isOpenToWork = process.env.NEXT_PUBLIC_IS_OPEN_TO_WORK === "true";

  return (
    <HeroIntro
      professionalSummary={about.professionalSummary}
      isOpenToWork={isOpenToWork}
      currentCompanyName={about.currentCompanyName}
      currentCompanyUrl={about.currentCompanyUrl}
    />
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col overflow-hidden border-b border-border/60 lg:min-h-[100dvh]">
      <HeroBackdrop />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-6 lg:py-24">
        <Suspense fallback={<HeroSkeleton />}>
          <div className="w-full max-w-4xl">
            <HeroContent />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
