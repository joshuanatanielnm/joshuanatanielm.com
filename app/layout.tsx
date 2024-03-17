import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/utils/ui";
import "./globals.css";
import { Footer } from "@/components/ui/footer";
import { defaultMetadata } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";

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
    site: defaultMetadata.x.username,
    description: defaultMetadata.description,
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
      <body className="bg-orange-50">
        <div className={cn(inter.className, "max-w-screen-lg mx-auto px-4")}>
          {children}
          <div className="flex lg:hidden pb-14">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
