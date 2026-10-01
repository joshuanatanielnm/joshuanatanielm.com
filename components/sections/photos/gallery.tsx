import Image from "next/image";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { format } from "date-fns";
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

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <RevealGroup className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {photos.map((photo, index) => {
        if (!photo.imageUrl) return null;
        const dim = dimensions[photo.orientation] ?? dimensions.landscape;
        return (
          <StaggerReveal key={photo.slug} index={index} className="break-inside-avoid">
            <figure className="group overflow-hidden rounded-2xl bg-card">
              <div className="overflow-hidden">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  width={dim.w}
                  height={dim.h}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium text-foreground">
                    {photo.title}
                  </span>
                  {photo.location ? (
                    <span className="inline-flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {photo.location}
                    </span>
                  ) : null}
                </div>
                {photo.takenDate ? (
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {format(new Date(photo.takenDate), "MMM yyyy")}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          </StaggerReveal>
        );
      })}
    </RevealGroup>
  );
}
