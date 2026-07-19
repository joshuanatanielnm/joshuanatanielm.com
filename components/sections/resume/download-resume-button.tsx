"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

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
      className="print:hidden gap-2 bg-orange-500 hover:bg-orange-600"
    >
      <DownloadIcon />
      Download PDF
    </Button>
  );
}
