import type { Metadata } from "next";
import { Suspense } from "react";
import { getGames } from "@/server/keystatic";
import { GameCard } from "@/components/sections/games/card";
import { PageHeader } from "@/components/ui/page-header";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { RevealGroup } from "@/components/motion/reveal-group";
import { NavigationContentSkeleton } from "@/components/ui/page-skeletons";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Games Joshua Manuputty is playing, has finished, or has queued up next.",
};

export const revalidate = 3600;

const statusOrder: Record<string, number> = {
  playing: 0,
  finished: 1,
  backlog: 2,
  wishlist: 3,
};

async function GamesGrid() {
  const games = await getGames();

  const sorted = [...games].sort((a, b) => {
    const orderDiff =
      (statusOrder[a.entry.status] ?? 4) - (statusOrder[b.entry.status] ?? 4);
    if (orderDiff !== 0) return orderDiff;
    return (b.entry.hours ?? 0) - (a.entry.hours ?? 0);
  });

  return (
    <RevealGroup className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {sorted.map((game, index) => (
        <StaggerReveal key={game.slug} index={index}>
          <GameCard
            title={game.entry.title}
            coverUrl={game.entry.coverUrl}
            platform={game.entry.platform}
            status={game.entry.status}
            rating={game.entry.rating}
            hours={game.entry.hours}
            link={game.entry.link}
            note={game.entry.note}
          />
        </StaggerReveal>
      ))}
    </RevealGroup>
  );
}

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <PageHeader
        title="Games"
        description="I think about games the way I think about software: the best ones respect your time and make good design feel effortless. Here's what I've been playing."
      />
      <Suspense fallback={<NavigationContentSkeleton />}>
        <GamesGrid />
      </Suspense>
    </div>
  );
}
