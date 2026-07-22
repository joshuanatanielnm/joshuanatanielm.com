import type { Metadata } from "next";
import { Suspense } from "react";
import { getGear, getPhotos } from "@/server/keystatic";
import { GearList, type GearItem } from "@/components/sections/gear/list";
import {
  PhotoGallery,
  type GalleryPhoto,
} from "@/components/sections/photos/gallery";
import { TopTracks } from "@/components/sections/spotify/top-tracks";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { NavigationContentSkeleton } from "@/components/ui/page-skeletons";

export const metadata: Metadata = {
  title: "Setup",
  description:
    "The desk, the devices, and the tools Joshua Manuputty uses to build software every day.",
};

export const revalidate = 3600;

async function SetupPhotos() {
  const photos = await getPhotos();

  const deskPhotos: GalleryPhoto[] = photos
    .filter((photo) => photo.entry.category === "setup")
    .map((photo) => ({
      slug: photo.slug,
      title: photo.entry.title,
      imageUrl: photo.entry.imageUrl,
      location: photo.entry.location,
      takenDate: photo.entry.takenDate,
      orientation: photo.entry.orientation,
    }));

  if (deskPhotos.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <SectionHeading
        title="The desk"
        description="A few corners of my workspace."
      />
      <PhotoGallery photos={deskPhotos} />
    </section>
  );
}

async function SetupGear() {
  const gear = await getGear();

  const gearItems: GearItem[] = gear.map((item) => ({
    slug: item.slug,
    name: item.entry.name,
    category: item.entry.category,
    description: item.entry.description ?? undefined,
    link: item.entry.link,
    featured: item.entry.featured,
  }));

  return (
    <section className="flex flex-col gap-8">
      <SectionHeading
        title="What I use"
        description="Hardware and software I reach for every day. Placeholder list for now, updated as things change."
      />
      <GearList items={gearItems} />
    </section>
  );
}

export default function Page() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-24">
      <PageHeader
        title="Setup"
        description="Where the work happens. A look at my desk and the gear I rely on day to day. Good tools get out of the way and let you focus on the craft."
      />

      <Suspense fallback={<NavigationContentSkeleton />}>
        <SetupPhotos />
      </Suspense>

      <Suspense fallback={<NavigationContentSkeleton />}>
        <SetupGear />
      </Suspense>

      <Suspense fallback={<NavigationContentSkeleton />}>
        <TopTracks />
      </Suspense>
    </div>
  );
}
