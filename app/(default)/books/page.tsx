import type { Metadata } from "next";
import { Suspense } from "react";
import { getBooks } from "@/server/keystatic";
import { BookCard } from "@/components/sections/books/card";
import { PageHeader } from "@/components/ui/page-header";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { RevealGroup } from "@/components/motion/reveal-group";
import { NavigationContentSkeleton } from "@/components/ui/page-skeletons";

export const metadata: Metadata = {
  title: "Reading",
  description:
    "Books Joshua Manuputty is reading, has finished, or wants to pick up next.",
};

export const revalidate = 3600;

const statusOrder: Record<string, number> = {
  reading: 0,
  finished: 1,
  "want-to-read": 2,
};

async function BooksGrid() {
  const books = await getBooks();

  const sorted = [...books].sort((a, b) => {
    const orderDiff =
      (statusOrder[a.entry.status] ?? 3) - (statusOrder[b.entry.status] ?? 3);
    if (orderDiff !== 0) return orderDiff;
    const aDate = a.entry.finishedDate ?? "";
    const bDate = b.entry.finishedDate ?? "";
    return bDate.localeCompare(aDate);
  });

  return (
    <RevealGroup className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {sorted.map((book, index) => (
        <StaggerReveal key={book.slug} index={index}>
          <BookCard
            title={book.entry.title}
            author={book.entry.author}
            coverUrl={book.entry.coverUrl}
            status={book.entry.status}
            rating={book.entry.rating}
            link={book.entry.link}
            note={book.entry.note}
          />
        </StaggerReveal>
      ))}
    </RevealGroup>
  );
}

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <PageHeader
        title="Reading"
        description="A running shelf of what I'm reading and what shaped how I think about building software, plus a few things that have nothing to do with it."
      />
      <Suspense fallback={<NavigationContentSkeleton />}>
        <BooksGrid />
      </Suspense>
    </div>
  );
}
