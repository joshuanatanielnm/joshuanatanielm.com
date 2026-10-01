import Image from "next/image";
import { NavLink } from "@/components/navigation/nav-link";
import {
  ArrowUpRight,
  BookOpen,
  Camera,
  GameController,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { getBooks, getGames, getPhotos } from "@/server/keystatic";
import { Reveal } from "@/components/motion/reveal";
import { RevealGroup, RevealGroupItem } from "@/components/motion/reveal-group";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/utils/ui";

type Thumb = { src: string; alt: string; portrait?: boolean };

function ShelfTile({
  href,
  label,
  title,
  meta,
  Icon: TileIcon,
  thumbs,
  className,
}: {
  href: string;
  label: string;
  title: string;
  meta: string;
  Icon: Icon;
  thumbs: Thumb[];
  className?: string;
}) {
  const visibleThumbs = thumbs.slice(0, 3);

  return (
    <NavLink
      href={href}
      className={cn(
        "group flex min-w-0 flex-col rounded-lg bg-foreground/[0.03] p-1.5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.99]",
        className
      )}
    >
      <div className="flex min-w-0 flex-col overflow-hidden rounded-[calc(0.5rem-1px)] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <TileIcon className="h-4 w-4 text-brand" weight="fill" />
            {label}
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-[4px] bg-secondary text-muted-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:bg-brand/10 group-hover:text-brand">
            <ArrowUpRight className="h-4 w-4" weight="bold" />
          </span>
        </div>

        <div className="flex flex-col gap-1 px-5 pb-4 pt-3">
          <h3 className="text-lg font-medium tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{meta}</p>
        </div>

        {visibleThumbs.length > 0 ? (
          <div className="grid min-w-0 grid-cols-3 gap-2 px-5 pb-5">
            {visibleThumbs.map((thumb, i) => (
              <div
                key={`${thumb.src}-${i}`}
                className="relative h-28 min-w-0 overflow-hidden rounded-xl sm:h-32"
              >
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  sizes="120px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 pb-5">
            <div className="rounded-xl bg-muted/40 px-4 py-8 text-center text-xs text-muted-foreground">
              Nothing here yet
            </div>
          </div>
        )}
      </div>
    </NavLink>
  );
}

export async function ShelfSection() {
  const [books, games, photos] = await Promise.all([
    getBooks(),
    getGames(),
    getPhotos(),
  ]);

  const bookThumbs: Thumb[] = books
    .filter((b) => b.entry.coverUrl)
    .slice(0, 3)
    .map((b) => ({
      src: b.entry.coverUrl!,
      alt: b.entry.title,
      portrait: true,
    }));

  const gameThumbs: Thumb[] = games
    .filter((g) => g.entry.coverUrl)
    .slice(0, 3)
    .map((g) => ({
      src: g.entry.coverUrl!,
      alt: g.entry.title,
      portrait: true,
    }));

  const journalPhotos = photos.filter((p) => p.entry.category === "journal");

  const photoThumbs: Thumb[] = journalPhotos
    .filter((p) => p.entry.imageUrl)
    .slice(0, 3)
    .map((p) => ({ src: p.entry.imageUrl!, alt: p.entry.title }));

  return (
    <section
      id="beyond"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          title="Beyond the code"
          description="Books, games, and places that keep me curious away from the keyboard."
        />
      </Reveal>

      <RevealGroup className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start lg:gap-6">
        <RevealGroupItem className="lg:col-span-7">
          <ShelfTile
            href="/books"
            label="Reading"
            title="What I'm reading"
            meta={`${books.length} books on the shelf`}
            Icon={BookOpen}
            thumbs={bookThumbs}
          />
        </RevealGroupItem>
        <RevealGroupItem className="lg:col-span-5">
          <ShelfTile
            href="/games"
            label="Playing"
            title="Games I love"
            meta={`${games.length} games tracked`}
            Icon={GameController}
            thumbs={gameThumbs}
          />
        </RevealGroupItem>
        <RevealGroupItem className="lg:col-span-5 lg:col-start-8">
          <ShelfTile
            href="/photos"
            label="Shooting"
            title="Through my lens"
            meta={`${journalPhotos.length} photos and counting`}
            Icon={Camera}
            thumbs={photoThumbs}
          />
        </RevealGroupItem>
      </RevealGroup>
    </section>
  );
}
