import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DownloadResumeButton } from "@/components/sections/resume/download-resume-button";
import { defaultMetadata } from "@/site.config";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume for ${defaultMetadata.title}`,
};

function getResumeMarkdown() {
  const filePath = path.join(process.cwd(), "content", "resume.md");
  return fs.readFileSync(filePath, "utf8");
}

export default function ResumePage() {
  const markdown = getResumeMarkdown();

  return (
    <div className="pb-24 print:pb-0">
      <div className="flex justify-end mb-6 print:hidden">
        <DownloadResumeButton />
      </div>
      <article
        className="
          resume-ats
          mx-auto max-w-3xl bg-white text-zinc-900 font-serif
          border border-zinc-200 rounded-lg shadow-sm
          px-8 py-10 sm:px-12 sm:py-14
          print:max-w-none print:border-0 print:rounded-none print:shadow-none
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </div>
  );
}
