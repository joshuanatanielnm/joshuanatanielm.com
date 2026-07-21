import {
  BookOpen,
  GameController,
  Hammer,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { format } from "date-fns";
import { getNow } from "@/server/keystatic";
import { Card } from "@/components/ui/card";
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
    <Card className="w-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Now
          </span>
        </div>
        {now.updatedAt ? (
          <span className="font-mono text-xs text-muted-foreground">
            {format(new Date(now.updatedAt), "MMM yyyy")}
          </span>
        ) : null}
      </div>

      <dl className="divide-y divide-border">
        {now.location ? (
          <div className="flex items-center gap-3 px-5 py-3">
            <MapPin className="h-4 w-4 shrink-0 text-brand" weight="fill" />
            <dt className="sr-only">Based in</dt>
            <dd className="text-sm text-foreground">{now.location}</dd>
          </div>
        ) : null}
        {rows.map(({ key, label, value, Icon }) => (
          <div key={key} className="flex items-start gap-3 px-5 py-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="flex flex-col gap-0.5">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {label}
              </dt>
              <dd className="text-sm leading-snug text-foreground">{value}</dd>
            </div>
          </div>
        ))}
        <SpotifyNowPlaying fallbackText={now.listening ?? undefined} />
      </dl>
    </Card>
  );
}
