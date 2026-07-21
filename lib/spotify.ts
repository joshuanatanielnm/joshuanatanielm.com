import "server-only";

/**
 * Spotify Web API integration.
 *
 * TODO: to enable, set these environment variables (see .env.example):
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *   SPOTIFY_REFRESH_TOKEN
 *
 * Everything degrades gracefully to `null` / `[]` when they're missing, so
 * the site keeps building and rendering without credentials.
 */

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";

export type Track = {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  songUrl: string;
};

export type NowPlaying = {
  isPlaying: boolean;
  track: Track | null;
};

export function isSpotifyConfigured() {
  return Boolean(CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN);
}

async function getAccessToken(
  revalidateSeconds?: number
): Promise<string | null> {
  if (!isSpotifyConfigured()) return null;

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  try {
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN as string,
      }),
      ...(revalidateSeconds
        ? { next: { revalidate: revalidateSeconds } }
        : { cache: "no-store" as const }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string };
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

function mapTrack(item: any): Track {
  const images = item?.album?.images ?? [];
  return {
    title: item?.name ?? "Unknown",
    artist: (item?.artists ?? [])
      .map((a: { name: string }) => a.name)
      .join(", "),
    album: item?.album?.name ?? "",
    albumImageUrl: images[1]?.url ?? images[0]?.url ?? null,
    songUrl: item?.external_urls?.spotify ?? "#",
  };
}

/**
 * Returns the currently playing track, falling back to the most recently
 * played track when nothing is live. Returns `null` when Spotify isn't
 * configured or the request fails.
 */
export async function getNowPlaying(): Promise<NowPlaying | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data?.item) {
        return { isPlaying: Boolean(data.is_playing), track: mapTrack(data.item) };
      }
    }

    // Nothing playing — fall back to recently played.
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (recentRes.ok) {
      const recent = await recentRes.json();
      const item = recent?.items?.[0]?.track;
      if (item) return { isPlaying: false, track: mapTrack(item) };
    }

    return { isPlaying: false, track: null };
  } catch {
    return null;
  }
}

/**
 * Returns the listener's top tracks. Returns `[]` when Spotify isn't
 * configured or the request fails.
 */
export async function getTopTracks(limit = 8): Promise<Track[]> {
  const token = await getAccessToken(1800);
  if (!token) return [];

  try {
    const res = await fetch(
      `${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.items ?? []).map(mapTrack);
  } catch {
    return [];
  }
}
