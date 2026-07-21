import type { Metadata } from "next";
import { getPhotos } from "@/server/keystatic";
import { PhotoGallery, type GalleryPhoto } from "@/components/sections/photos/gallery";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "A small photo journal by Joshua Manuputty. Places, people, and light around Indonesia and beyond.",
};

export default async function Page() {
  const photos = await getPhotos();

  const journal = photos.filter((photo) => photo.entry.category !== "setup");

  const sorted = [...journal].sort((a, b) => {
    const aDate = a.entry.takenDate ?? "";
    const bDate = b.entry.takenDate ?? "";
    return bDate.localeCompare(aDate);
  });

  const gallery: GalleryPhoto[] = sorted.map((photo) => ({
    slug: photo.slug,
    title: photo.entry.title,
    imageUrl: photo.entry.imageUrl,
    location: photo.entry.location,
    takenDate: photo.entry.takenDate,
    orientation: photo.entry.orientation,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <PageHeader
        title="Photos"
        description="A quiet corner of the site. Photos I've taken around Surabaya and while travelling. No filters, just moments I wanted to keep."
      />

      <div className="mt-12">
        <PhotoGallery photos={gallery} />
      </div>
    </div>
  );
}
