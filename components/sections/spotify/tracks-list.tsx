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
      <ul className="grid gap-2 sm:grid-cols-2">
        {tracks.map((track, index) => (
          <RevealGroupItem key={`${track.songUrl}-${index}`}>
            <Link
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-card"
            >
              {track.albumImageUrl ? (
                <Image
                  src={track.albumImageUrl}
                  alt={`${track.title} album art`}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-md object-cover"
                  unoptimized
                />
              ) : (
                <span className="h-11 w-11 shrink-0 rounded-md bg-muted" />
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
      </ul>
    </RevealGroup>
  );
}
