import Image from "next/image";
import Link from "next/link";
import { SpotifyLogo } from "@phosphor-icons/react/dist/ssr";
import { getTopTracks } from "@/lib/spotify";
import { SectionHeading } from "@/components/ui/section-heading";

export async function TopTracks() {
  const tracks = await getTopTracks(8);

  // Renders nothing until Spotify credentials are configured.
  if (tracks.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <SectionHeading
        as="h2"
        title="On repeat while working"
        description="My most-played tracks this month, straight from Spotify."
        action={
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <SpotifyLogo className="h-4 w-4 text-[#1DB954]" weight="fill" />
            Live
          </span>
        }
      />
      <ol className="grid gap-2 sm:grid-cols-2">
        {tracks.map((track, i) => (
          <li key={`${track.songUrl}-${i}`}>
            <Link
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-card"
            >
              <span className="w-4 shrink-0 text-right font-mono text-xs text-muted-foreground">
                {i + 1}
              </span>
              {track.albumImageUrl ? (
                <Image
                  src={track.albumImageUrl}
                  alt={`${track.title} album art`}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-md border border-border object-cover"
                  unoptimized
                />
              ) : (
                <span className="h-11 w-11 shrink-0 rounded-md border border-border bg-muted" />
              )}
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground group-hover:text-brand">
                  {track.title}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {track.artist}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
