"use client";

import Image from "next/image";
import Link from "next/link";
import {
  RevealGroup,
  RevealGroupItem,
} from "@/components/motion/reveal-group";
import type { Track } from "@/lib/spotify";

export function TracksList({ tracks }: { tracks: Track[] }) {
  return (
    <RevealGroup>
      <ol className="grid gap-2 sm:grid-cols-2">
        {tracks.map((track, index) => (
          <RevealGroupItem key={`${track.songUrl}-${index}`}>
            <Link
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-card"
            >
              <span className="w-4 shrink-0 text-right font-mono text-xs text-muted-foreground">
                {index + 1}
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
          </RevealGroupItem>
        ))}
      </ol>
    </RevealGroup>
  );
}
