import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getNowPlaying();

  if (!data) {
    return NextResponse.json(
      { configured: false, isPlaying: false, track: null },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { configured: true, ...data },
    { headers: { "Cache-Control": "no-store" } }
  );
}
