import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { getAbout, getLifePhotos } from "@/server/keystatic";
import { AboutDocument } from "@/components/sections/about/about-document";
import { LifeGallery } from "@/components/sections/about/life-gallery";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import type { GalleryPhoto } from "@/components/sections/photos/gallery";
import { NavigationContentSkeleton } from "@/components/ui/page-skeletons";
import { Blaze } from "@/components/canvasui/Blaze";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();

  return {
    title: "About",
    description:
      about.pageDescription ??
      "More about Joshua Manuputty — background, how he works, and life outside of software.",
  };
}

export default function Page() {
  return (
    <>
      {/*
        Pinned to the viewport so the fire stays at the bottom of the screen
        and the page scrolls past it, as in the Canvas UI demo. It sits beside
        the content rather than wrapping it: wrapping only feeds the
        heat-distortion path, which is gated behind the experimental
        html-in-canvas API that no shipping browser enables. A viewport-sized
        canvas also gives the shader the landscape aspect its spark sizing
        assumes, so the documented prop values apply as-is.
      */}
      <Blaze
        className="pointer-events-none z-[3]"
        // Must come through `style`, not className: the component hard-codes
        // `position: relative` inline and spreads `style` after it, so a
        // `fixed` utility class is silently overridden.
        style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: "100dvh" }}
        height={0.97}
        distortion={0.6}
        distortionScale={0.5}
        sparks={0.5}
        sparkDensity={1.5}
        sparkSize={1}
        layers={4}
        smoke={0.5}
        glow={1.5}
        // Blue flame, pulled from the theme's own brand tokens: the brighter
        // dark-mode blue (--ring, #6aaef8) for embers so they stay legible,
        // and the ink blue (--brand, #2563eb) for the smoke and ambient glow.
        sparkColor={[0.416, 0.682, 0.973]}
        smokeColor={[0.145, 0.388, 0.922]}
      >
        {null}
      </Blaze>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <PageHeader
          title="About me"
          description="The longer version — where I'm from, how I got into building software, and what I'm like away from a codebase."
        />
        <Suspense fallback={<NavigationContentSkeleton />}>
          <AboutPageContent />
        </Suspense>
      </div>
    </>
  );
}

async function AboutPageContent() {
  const [about, lifePhotos] = await Promise.all([getAbout(), getLifePhotos()]);
  const content = await about.content();

  const gallery: GalleryPhoto[] = lifePhotos.map((photo) => ({
    slug: photo.slug,
    title: photo.entry.title,
    imageUrl: photo.entry.imageUrl,
    location: photo.entry.location,
    takenDate: photo.entry.takenDate,
    orientation: photo.entry.orientation,
  }));

  return (
    <>
      {about.cover ? (
        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-lg bg-foreground/[0.03] p-1.5">
            <div className="relative aspect-[21/9] overflow-hidden rounded-[calc(0.5rem-1px)] bg-muted">
              <Image
                src={about.cover}
                alt="Joshua Manuputty"
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      ) : null}

      <Reveal className="mt-12 lg:mt-16">
        <AboutDocument document={content} />
      </Reveal>

      <LifeGallery photos={gallery} />
    </>
  );
}
