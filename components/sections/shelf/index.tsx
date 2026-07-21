import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Camera,
  GameController,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { getBooks, getGames, getPhotos } from "@/server/keystatic";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Thumb = { src: string; alt: string; portrait?: boolean };

function ShelfTile({
  href,
  label,
  title,
  meta,
  Icon: TileIcon,
  thumbs,
}: {
  href: string;
  label: string;
  title: string;
  meta: string;
  Icon: Icon;
  thumbs: Thumb[];
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40"
    >
      <div className="flex items-center justify-between px-5 pt-5">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <TileIcon className="h-4 w-4 text-brand" weight="fill" />
          {label}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-brand"
          weight="bold"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 px-5 pb-4 pt-3">
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{meta}</p>
      </div>

      <div className="flex gap-2 px-5 pb-5">
        {thumbs.map((thumb, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-lg border border-border ${
              thumb.portrait ? "aspect-[3/4] flex-1" : "aspect-square flex-1"
            }`}
          >
            <Image
              src={thumb.src}
              alt={thumb.alt}
              fill
              sizes="120px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </Link>
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
    .map((b) => ({ src: b.entry.coverUrl!, alt: b.entry.title, portrait: true }));

  const gameThumbs: Thumb[] = games
    .filter((g) => g.entry.coverUrl)
    .slice(0, 3)
    .map((g) => ({ src: g.entry.coverUrl!, alt: g.entry.title, portrait: true }));

  const journalPhotos = photos.filter((p) => p.entry.category !== "setup");

  const photoThumbs: Thumb[] = journalPhotos
    .filter((p) => p.entry.imageUrl)
    .slice(0, 3)
    .map((p) => ({ src: p.entry.imageUrl!, alt: p.entry.title }));

  return (
    <section
      id="beyond"
      className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16"
    >
      <Reveal>
        <SectionHeading
          title="Beyond the code"
          description="The books, games, and places that keep me curious when I'm away from the keyboard."
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-10 grid gap-6 md:grid-cols-3">
        <ShelfTile
          href="/books"
          label="Reading"
          title="What I'm reading"
          meta={`${books.length} books on the shelf`}
          Icon={BookOpen}
          thumbs={bookThumbs}
        />
        <ShelfTile
          href="/games"
          label="Playing"
          title="Games I love"
          meta={`${games.length} games tracked`}
          Icon={GameController}
          thumbs={gameThumbs}
        />
        <ShelfTile
          href="/photos"
          label="Shooting"
          title="Through my lens"
          meta={`${journalPhotos.length} photos and counting`}
          Icon={Camera}
          thumbs={photoThumbs}
        />
      </Reveal>
    </section>
  );
}
