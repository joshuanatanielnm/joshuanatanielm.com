import type { Metadata } from "next";
import { getBooks } from "@/server/keystatic";
import { BookCard } from "@/components/sections/books/card";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Reading",
  description:
    "Books Joshua Manuputty is reading, has finished, or wants to pick up next.",
};

const statusOrder: Record<string, number> = {
  reading: 0,
  finished: 1,
  "want-to-read": 2,
};

export default async function Page() {
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
    <div className="mx-auto max-w-5xl px-4 py-16">
      <PageHeader
        title="Reading"
        description="A running shelf of what I'm reading and what shaped how I think about building software, plus a few things that have nothing to do with it."
      />

      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {sorted.map((book, index) => (
          <Reveal key={book.slug} delay={Math.min(index * 0.04, 0.24)}>
            <BookCard
              title={book.entry.title}
              author={book.entry.author}
              coverUrl={book.entry.coverUrl}
              status={book.entry.status}
              rating={book.entry.rating}
              link={book.entry.link}
              note={book.entry.note}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
