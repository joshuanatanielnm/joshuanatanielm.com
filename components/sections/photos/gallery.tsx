import Image from "next/image";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { RevealGroup } from "@/components/motion/reveal-group";

export type GalleryPhoto = {
  slug: string;
  title: string;
  imageUrl?: string | null;
  location?: string;
  takenDate?: string | null;
  orientation: string;
};

const dimensions: Record<string, { w: number; h: number }> = {
  landscape: { w: 1200, h: 800 },
  portrait: { w: 800, h: 1100 },
  square: { w: 1000, h: 1000 },
};

export function PrintCaption({ photo }: { photo: GalleryPhoto }) {
  return (
    <figcaption className="flex items-baseline justify-between gap-3 px-1 py-2.5">
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-foreground">
          {photo.title}
        </span>
        {photo.location ? (
          <span className="truncate text-xs text-muted-foreground">
            {photo.location}
          </span>
        ) : null}
      </span>
      {photo.takenDate ? (
        <time
          dateTime={photo.takenDate}
          className="shrink-0 text-xs text-muted-foreground"
        >
          {format(new Date(photo.takenDate), "MMM yyyy")}
        </time>
      ) : null}
    </figcaption>
  );
}

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <RevealGroup className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {photos.map((photo, index) => {
        if (!photo.imageUrl) return null;
        const dim = dimensions[photo.orientation] ?? dimensions.landscape;
        return (
          <StaggerReveal key={photo.slug} index={index} className="break-inside-avoid">
            {/* A print: the photo inside a paper margin, captioned in the foot. */}
            <Card as="figure" className="p-2 pb-0">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                width={dim.w}
                height={dim.h}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full rounded-[1px] bg-muted object-cover"
              />
              <PrintCaption photo={photo} />
            </Card>
          </StaggerReveal>
        );
      })}
    </RevealGroup>
  );
}
