import { DocumentRenderer, type DocumentRendererProps } from "@keystatic/core/renderer";
import { getBasicRenderers } from "@/components/keystatic/basic-renderer";
import { cn } from "@/utils/ui";

type AboutDocumentProps = {
  document: DocumentRendererProps["document"];
  className?: string;
};

export function AboutDocument({ document, className }: AboutDocumentProps) {
  const renderers = getBasicRenderers();

  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none text-[15px] leading-relaxed text-muted-foreground dark:prose-invert",
        "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground",
        "prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-lg",
        "prose-p:my-0 prose-a:font-medium prose-a:text-brand prose-a:no-underline hover:prose-a:underline",
        "prose-img:my-8 prose-img:rounded-2xl prose-img:border prose-img:border-border",
        "[&>p]:mb-4 [&>p:last-child]:mb-0",
        className
      )}
    >
      <DocumentRenderer document={document} renderers={renderers} />
    </div>
  );
}
