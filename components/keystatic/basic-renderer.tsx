import { DocumentRendererProps } from "@keystatic/core/renderer";
import { ExternalLink } from "./external-link";

export function getBasicRenderers(): DocumentRendererProps["renderers"] {
  return {
    block: {
      //
    },
    inline: {
      link: ExternalLink,
    },
  };
}
