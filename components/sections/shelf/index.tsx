import Image from "next/image";
import { NavLink } from "@/components/navigation/nav-link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getBooks, getGames, getPhotos } from "@/server/keystatic";
import { Reveal } from "@/components/motion/reveal";
import { RevealGroup, RevealGroupItem } from "@/components/motion/reveal-group";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/utils/ui";

type Thumb = { src: string; alt: string };
type Shape = "cover" | "keyart" | "print";

const SHAPE_CLASS: Record<Shape, string> = {
  // Real-world proportions: a paperback, a game case, a 4:3 print.
  cover: "aspect-[2/3] w-16 sm:w-20",
  keyart: "aspect-[3/4] w-[4.5rem] sm:w-24",
  print: "aspect-[4/3] w-24 sm:w-32",
};

const WORDS = [
  "no", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];
const count = (n: number) => (n <= 20 ? WORDS[n] : String(n));

function ShelfRow({
  href,
  title,
  blurb,
  thumbs,
  shape,
  tilt,
}: {
  href: string;
  title: string;
  blurb: string;
  thumbs: Thumb[];
  shape: Shape;
  /** Nudge every other thumbnail so the row reads as objects set down, not a grid. */
  tilt?: boolean;
}) {
  return (
    <NavLink
      href={href}
      className="group grid grid-cols-1 gap-6 border-t border-border/70 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10"
    >
      <div className="flex flex-col gap-1.5 sm:col-span-4">
        <h3 className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
          <span className="underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:decoration-brand">
            {title}
          </span>
          <ArrowRight
            className="h-4 w-4 text-muted-foreground transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:text-brand"
            weight="bold"
          />
        </h3>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          {blurb}
        </p>
      </div>

      <div className="relative sm:col-span-8">
        {thumbs.length > 0 ? (
          <div className="flex items-end gap-3 overflow-hidden pb-3 sm:gap-4">
            {thumbs.map((thumb, i) => (
              <div
                key={`${thumb.src}-${i}`}
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-[3px] bg-muted shadow-[0_1px_0_hsl(var(--foreground)/0.08),0_8px_20px_-12px_hsl(var(--foreground)/0.35)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1",
                  SHAPE_CLASS[shape],
                  tilt && i % 2 === 1 && "translate-y-1"
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="pb-3 text-sm text-muted-foreground">Nothing on this shelf yet.</p>
        )}
        {/* The shelf itself: a hairline the objects sit on, with a dimension tick at each end. */}
        <span aria-hidden className="dim-line absolute inset-x-0 bottom-0" />
        {/* Soft edge where the row runs off, so a long shelf implies more. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"
        />
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

  const inProgressFirst = <T extends { entry: { status: string } }>(
    items: T[],
    active: string
  ) => [...items].sort((a, b) => Number(b.entry.status === active) - Number(a.entry.status === active));

  const bookThumbs: Thumb[] = inProgressFirst(books, "reading")
    .filter((b) => b.entry.coverUrl)
    .slice(0, 6)
    .map((b) => ({ src: b.entry.coverUrl!, alt: b.entry.title }));

  const gameThumbs: Thumb[] = inProgressFirst(games, "playing")
    .filter((g) => g.entry.coverUrl)
    .slice(0, 5)
    .map((g) => ({ src: g.entry.coverUrl!, alt: g.entry.title }));

  const journalPhotos = photos.filter((p) => p.entry.category === "journal");

  const photoThumbs: Thumb[] = journalPhotos
    .filter((p) => p.entry.imageUrl)
    .slice(0, 4)
    .map((p) => ({ src: p.entry.imageUrl!, alt: p.entry.title }));

  const reading = books.find((b) => b.entry.status === "reading")?.entry.title;
  const playing = games.find((g) => g.entry.status === "playing")?.entry.title;
  const finishedBooks = books.filter((b) => b.entry.status === "finished").length;

  return (
    <section
      id="beyond"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          title="Off the clock"
          description="The shelves at home, more or less: what I'm reading, playing, and pointing a camera at."
        />
      </Reveal>

      <RevealGroup className="mt-12 border-b border-border/70">
        <RevealGroupItem>
          <ShelfRow
            href="/books"
            title="Reading"
            blurb={
              reading
                ? `${capitalize(count(finishedBooks))} finished. On the nightstand now: ${reading}.`
                : `${capitalize(count(finishedBooks))} finished, a few more waiting.`
            }
            thumbs={bookThumbs}
            shape="cover"
            tilt
          />
        </RevealGroupItem>
        <RevealGroupItem>
          <ShelfRow
            href="/games"
            title="Playing"
            blurb={
              playing
                ? `${capitalize(count(games.length))} games tracked. Currently in: ${playing}.`
                : `${capitalize(count(games.length))} games, finished or abandoned.`
            }
            thumbs={gameThumbs}
            shape="keyart"
          />
        </RevealGroupItem>
        <RevealGroupItem>
          <ShelfRow
            href="/photos"
            title="Photographing"
            blurb={`${capitalize(count(journalPhotos.length))} prints from Surabaya and wherever else I end up.`}
            thumbs={photoThumbs}
            shape="print"
            tilt
          />
        </RevealGroupItem>
      </RevealGroup>
    </section>
  );
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
