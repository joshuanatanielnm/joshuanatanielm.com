"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpotifyLogo } from "@phosphor-icons/react/dist/ssr";

type Track = {
  title: string;
  artist: string;
  albumImageUrl: string | null;
  songUrl: string;
};

type NowPlayingResponse = {
  configured: boolean;
  isPlaying: boolean;
  track: Track | null;
};

function Equalizer() {
  return (
    <span className="flex h-4 items-end gap-0.5" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="eq-bar h-full w-0.5 rounded-full bg-brand" />
      ))}
    </span>
  );
}

export function SpotifyNowPlaying({ fallbackText }: { fallbackText?: string }) {
  const [data, setData] = useState<NowPlayingResponse | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing", {
          cache: "no-store",
        });
        const json = (await res.json()) as NowPlayingResponse;
        if (active) setData(json);
      } catch {
        /* keep last known state */
      }
    };
    load();
    const id = setInterval(load, 30_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const track = data?.track;
  const label = data?.isPlaying
    ? "Listening now"
    : track
    ? "Last played"
    : "Listening";

  return (
    <div className="flex items-center gap-3 px-5 py-3">
      {track?.albumImageUrl ? (
        <Image
          src={track.albumImageUrl}
          alt={`${track.title} album art`}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-md object-cover"
          unoptimized
        />
      ) : (
        <SpotifyLogo
          className="h-4 w-4 shrink-0 text-[#1DB954]"
          weight="fill"
        />
      )}

      <div className="flex min-w-0 flex-col gap-0.5">
        <dt className="flex items-center gap-1.5 font-condensed font-medium text-xs uppercase tracking-[0.06em] text-muted-foreground">
          {label}
          {data?.isPlaying ? <Equalizer /> : null}
        </dt>
        <dd className="truncate text-sm leading-snug text-foreground">
          {track ? (
            <Link
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand"
            >
              <span className="font-medium">{track.title}</span>
              <span className="text-muted-foreground"> · {track.artist}</span>
            </Link>
          ) : (
            <span className="text-muted-foreground">
              {fallbackText ?? "Nothing right now"}
            </span>
          )}
        </dd>
      </div>
    </div>
  );
}
