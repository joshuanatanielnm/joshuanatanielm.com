import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/utils/ui";
import "./globals.css";
import { defaultMetadata } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#fb923c",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#fb923c" />
      </head>
      <Analytics />
      <SpeedInsights />
      <body className="bg-orange-50">
        <div className="h-3 w-full bg-gradient-to-b from-orange-500 to-yellow-50" />
        <div
          className={cn(inter.className, "max-w-screen-lg mx-auto px-4 pt-12")}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
