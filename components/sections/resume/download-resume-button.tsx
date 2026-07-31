"use client";

import { Button } from "@/components/ui/button";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";

export function DownloadResumeButton() {
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "";

    window.addEventListener(
      "afterprint",
      () => {
        document.title = originalTitle;
      },
      { once: true }
    );

    window.print();
  };

  return (
    <Button
      type="button"
      onClick={handlePrint}
      className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90 print:hidden"
    >
      <DownloadSimple className="h-4 w-4" weight="bold" />
      Download PDF
    </Button>
  );
}
