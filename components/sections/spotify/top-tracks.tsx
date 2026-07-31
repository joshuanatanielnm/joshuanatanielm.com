import { SpotifyLogo } from "@phosphor-icons/react/dist/ssr";
import { getTopTracks } from "@/lib/spotify";
import { Reveal } from "@/components/motion/reveal";
import { TracksList } from "@/components/sections/spotify/tracks-list";
import { SectionHeading } from "@/components/ui/section-heading";

export async function TopTracks() {
  const tracks = await getTopTracks(8);

  if (tracks.length === 0) return null;

  return (
    <Reveal>
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
        <TracksList tracks={tracks} />
      </section>
    </Reveal>
  );
}
