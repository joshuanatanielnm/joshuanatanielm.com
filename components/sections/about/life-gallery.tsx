import Image from "next/image";
import { NavLink } from "@/components/navigation/nav-link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { RevealGroup } from "@/components/motion/reveal-group";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { Card } from "@/components/ui/card";
import {
  PrintCaption,
  type GalleryPhoto,
} from "@/components/sections/photos/gallery";
import { cn } from "@/utils/ui";

const spanClass: Record<string, string> = {
  landscape: "sm:col-span-2",
  portrait: "sm:row-span-2",
  square: "",
};

export function LifeGallery({ photos }: { photos: GalleryPhoto[] }) {
  if (photos.length === 0) return null;

  return (
    <section className="mt-20 border-t border-border pt-16 sm:mt-24 sm:pt-20">
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className=" font-medium text-sm text-muted-foreground">
              Life
            </span>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Away from the keyboard
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Small moments from home, travel, and time with people I care about.
            </p>
          </div>
          <NavLink
            href="/photos"
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand/80"
          >
            Photo journal
            <span className="grid h-7 w-7 place-items-center rounded-[4px] bg-brand/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" weight="bold" />
            </span>
          </NavLink>
        </div>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {photos.map((photo, index) => {
          if (!photo.imageUrl) return null;
          const orientation = photo.orientation ?? "landscape";

          return (
            <StaggerReveal
              key={photo.slug}
              index={index}
              className={cn("min-w-0", spanClass[orientation])}
            >
              <Card as="figure" className="p-2 pb-0">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[1px] bg-muted",
                    orientation === "portrait"
                      ? "aspect-[3/4]"
                      : orientation === "square"
                        ? "aspect-square"
                        : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <PrintCaption photo={photo} />
              </Card>
            </StaggerReveal>
          );
        })}
      </RevealGroup>
    </section>
  );
}
