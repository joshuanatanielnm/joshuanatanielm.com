import {
  BookOpen,
  GameController,
  Hammer,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { getNow } from "@/server/keystatic";
import { SpotifyNowPlaying } from "@/components/sections/spotify/now-playing";

const rowConfig = [
  { key: "reading", label: "Reading", Icon: BookOpen },
  { key: "playing", label: "Playing", Icon: GameController },
  { key: "building", label: "Building", Icon: Hammer },
] as const;

export async function NowPanel() {
  const now = await getNow();
  if (!now) return null;

  const rows = rowConfig
    .map((row) => ({ ...row, value: now[row.key] }))
    .filter((row) => Boolean(row.value));

  return (
    <div className="w-full rounded-lg bg-card shadow-[0_24px_80px_hsl(240_6%_10%/0.06)] dark:shadow-[0_24px_80px_hsl(0_0%_0%/0.35)]">
      <div className="overflow-hidden rounded-[calc(0.5rem-1px)]">
        <div className="flex items-center justify-between border-b border-foreground/25 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span className="font-condensed font-medium text-xs uppercase tracking-[0.08em] text-muted-foreground">
              Title block · Now
            </span>
          </div>
        </div>

        <dl className="divide-y divide-border">
          {now.location ? (
            <div className="flex items-center gap-3 px-5 py-3.5">
              <MapPin className="h-4 w-4 shrink-0 text-brand" weight="fill" />
              <dt className="sr-only">Based in</dt>
              <dd className="text-sm text-foreground">{now.location}</dd>
            </div>
          ) : null}
          {rows.map(({ key, label, value, Icon }) => (
            <div key={key} className="flex items-start gap-3 px-5 py-3.5">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-0.5">
                <dt className="font-condensed font-medium text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="text-sm leading-snug text-foreground">{value}</dd>
              </div>
            </div>
          ))}
          <SpotifyNowPlaying fallbackText={now.listening ?? undefined} />
        </dl>
      </div>
    </div>
  );
}
