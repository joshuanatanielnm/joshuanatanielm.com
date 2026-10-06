import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { cn } from "@/utils/ui";
import "./globals.css";
import { defaultMetadata } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";

// Roboto, self-hosted variable cut (weights 100-900) so the build never
// depends on a font CDN at compile time.
const roboto = localFont({
  src: [
    {
      path: "./fonts/roboto-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/roboto-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-roboto",
});

// Roboto Condensed — labels, badges, metadata. Self-hosted for the same
// reason as above.
const robotoCondensed = localFont({
  src: [
    {
      path: "./fonts/roboto-condensed-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/roboto-condensed-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-roboto-condensed",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0F3F4" },
    { media: "(prefers-color-scheme: dark)", color: "#111a1f" },
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
  openGraph: {
    type: "website",
    url: defaultMetadata.url,
    siteName: defaultMetadata.title,
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultMetadata.title,
    site: defaultMetadata.x.username,
    description: defaultMetadata.description,
    creator: defaultMetadata.x.username,
  },
  robots: {
    follow: true,
    index: true,
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
        "motion-safe:scroll-smooth",
        roboto.variable,
        robotoCondensed.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] bg-background font-sans text-foreground print:bg-white">
        {/* Runs before first paint so CSS can pre-hide reveal targets only
            when JS is available — without JS the page stays fully visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-foreground"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
