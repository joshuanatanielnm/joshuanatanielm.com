import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/utils/ui";
import "./globals.css";
import { defaultMetadata } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head />
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
