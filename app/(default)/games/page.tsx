import type { Metadata } from "next";
import { getGames } from "@/server/keystatic";
import { GameCard } from "@/components/sections/games/card";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Games Joshua Manuputty is playing, has finished, or has queued up next.",
};

const statusOrder: Record<string, number> = {
  playing: 0,
  finished: 1,
  backlog: 2,
  wishlist: 3,
};

export default async function Page() {
  const games = await getGames();

  const sorted = [...games].sort((a, b) => {
    const orderDiff =
      (statusOrder[a.entry.status] ?? 4) - (statusOrder[b.entry.status] ?? 4);
    if (orderDiff !== 0) return orderDiff;
    return (b.entry.hours ?? 0) - (a.entry.hours ?? 0);
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <PageHeader
        title="Games"
        description="I think about games the way I think about software: the best ones respect your time and make good design feel effortless. Here's what I've been playing."
      />

      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {sorted.map((game, index) => (
          <Reveal key={game.slug} delay={Math.min(index * 0.04, 0.24)}>
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
          </Reveal>
        ))}
      </div>
    </div>
  );
}
