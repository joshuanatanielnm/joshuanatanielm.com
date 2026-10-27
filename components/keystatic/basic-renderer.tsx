import { DocumentRendererProps } from "@keystatic/core/renderer";
import Image from "next/image";
import { ExternalLink } from "./external-link";

export function getBasicRenderers(): DocumentRendererProps["renderers"] {
  return {
    block: {
      image: ({ src, alt, title }) => (
        <figure className="my-8 overflow-hidden rounded-2xl bg-card">
          <div className="relative aspect-[16/10] w-full bg-muted">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {title ? (
            <figcaption className="px-4 py-3 text-sm text-muted-foreground">
              {title}
            </figcaption>
          ) : null}
        </figure>
      ),
    },
    inline: {
      link: ExternalLink,
    },
  };
}
