import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/utils/ui";
import "./globals.css";
import { defaultMetadata } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f0" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(defaultMetadata.url),
  title: {
    template: `%s ⋅ ${defaultMetadata.title}`,
    absolute: defaultMetadata.title,
  },
  description: defaultMetadata.description,
  twitter: {
    card: "summary_large_image",
    title: defaultMetadata.title,
    site: defaultMetadata.url,
    description: defaultMetadata.description,
    creator: defaultMetadata.x.username,
  },
  robots: {
    follow: true,
    index: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: defaultMetadata.url,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "scroll-smooth",
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] bg-background font-sans text-foreground print:bg-white">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
