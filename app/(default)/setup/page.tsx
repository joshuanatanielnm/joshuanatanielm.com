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

export const metadata: Metadata = {
  title: "Setup",
  description:
    "The desk, the devices, and the tools Joshua Manuputty uses to build software every day.",
};

export default async function Page() {
  const [gear, photos] = await Promise.all([getGear(), getPhotos()]);

  const gearItems: GearItem[] = gear.map((item) => ({
    slug: item.slug,
    name: item.entry.name,
    category: item.entry.category,
    description: item.entry.description ?? undefined,
    link: item.entry.link,
    featured: item.entry.featured,
  }));

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

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-16">
      <PageHeader
        title="Setup"
        description="Where the work happens. A look at my desk and the gear I rely on day to day. Good tools get out of the way and let you focus on the craft."
      />

      {deskPhotos.length > 0 ? (
        <section className="flex flex-col gap-6">
          <SectionHeading
            title="The desk"
            description="A few corners of my workspace."
          />
          <PhotoGallery photos={deskPhotos} />
        </section>
      ) : null}

      <section className="flex flex-col gap-8">
        <SectionHeading
          title="What I use"
          description="Hardware and software I reach for every day. Placeholder list for now, updated as things change."
        />
        <GearList items={gearItems} />
      </section>

      <Suspense fallback={null}>
        <TopTracks />
      </Suspense>
    </div>
  );
}
