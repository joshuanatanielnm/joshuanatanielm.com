import { ImageResponse } from "next/og";
import { defaultMetadata } from "@/site.config";

export const runtime = "edge";

export const alt = defaultMetadata.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/* As-Built Drawing palette — mirrors the light theme in globals.css. */
const colors = {
  background: "#f0f3f4",
  foreground: "#1d2c34",
  mutedForeground: "#5d7583",
  border: "#d3dade",
  brand: "#2563eb",
  grid: "rgba(61, 111, 143, 0.08)",
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.background,
          backgroundImage: `linear-gradient(to right, ${colors.grid} 1px, transparent 1px), linear-gradient(to bottom, ${colors.grid} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 96px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: `1px solid ${colors.border}`,
              borderRadius: 3,
              backgroundColor: "#fbfdfd",
              padding: "8px 16px",
              alignSelf: "flex-start",
              fontSize: 20,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: colors.mutedForeground,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: colors.brand,
              }}
            />
            Software Engineer · Surabaya, ID
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: colors.foreground,
              letterSpacing: "-0.03em",
              marginTop: 40,
            }}
          >
            Joshua Manuputty
          </div>
          <div
            style={{
              fontSize: 30,
              color: colors.mutedForeground,
              marginTop: 28,
              lineHeight: 1.5,
              maxWidth: 920,
            }}
          >
            {defaultMetadata.description}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: colors.brand,
              marginTop: 48,
              letterSpacing: "0.05em",
            }}
          >
            joshuanatanielm.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
