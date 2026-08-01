import type { Metadata } from "next";
import { Suspense } from "react";
import { getPhotos } from "@/server/keystatic";
import { PhotoGallery, type GalleryPhoto } from "@/components/sections/photos/gallery";
import { PageHeader } from "@/components/ui/page-header";
import { NavigationContentSkeleton } from "@/components/ui/page-skeletons";
import { Droplets } from "@/components/canvasui/Droplets";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "A small photo journal by Joshua Manuputty. Places, people, and light around Indonesia and beyond.",
};

export const revalidate = 3600;

async function PhotosGallery() {
  const photos = await getPhotos();
  const journal = photos.filter((photo) => photo.entry.category === "journal");

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
    <div className="mt-12">
      <PhotoGallery photos={gallery} />
    </div>
  );
}

export default function Page() {
  return (
    <>
      {/*
        Pinned to the viewport so the rain covers the whole page and stays put
        while the gallery scrolls behind it, matching the fire on /about. A
        viewport-sized canvas is also landscape, so drops keep their natural
        shape — wrapping the tall gallery used to stretch them vertically.
      */}
      <Droplets
        className="pointer-events-none z-[3]"
        // Must come through `style`: the component hard-codes
        // `position: relative` inline and spreads `style` after it, so a
        // `fixed` utility class would be silently overridden.
        style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: "100dvh" }}
        intensity={0.3}
        refraction={0.3}
        dropWidth={1}
        scale={0.5}
        tint={[0.145, 0.388, 0.922]}
        tintStrength={0.35}
        // The overlay has to stay click-through for the page underneath to
        // work, and the wipe listens on this wrapper — so it can't fire.
        interactive={false}
      >
        {null}
      </Droplets>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <PageHeader
          title="Photos"
          description="A quiet corner of the site. Photos I've taken around Surabaya and while travelling. No filters, just moments I wanted to keep."
        />
        <Suspense fallback={<NavigationContentSkeleton />}>
          <PhotosGallery />
        </Suspense>
      </div>
    </>
  );
}
