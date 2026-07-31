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
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <PageHeader
        title="About me"
        description="The longer version — where I'm from, how I got into building software, and what I'm like away from a codebase."
      />
      <Suspense fallback={<NavigationContentSkeleton />}>
        <AboutPageContent />
      </Suspense>
    </div>
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
          <div className="overflow-hidden rounded-lg border border-border bg-foreground/[0.03] p-1.5">
            <div className="relative aspect-[21/9] overflow-hidden rounded-[calc(0.5rem-1px)] border border-border/60 bg-muted">
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
