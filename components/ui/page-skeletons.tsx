import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/ui";

export function PageShellSkeleton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn(
        "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24",
        className
      )}
    >
      <span className="sr-only">Loading page…</span>
      {children}
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-16 rounded-full" />
        <Skeleton className="h-11 w-full max-w-md" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
    </div>
  );
}

export function ProseSkeleton({ lines = 8 }: { lines?: number }) {
  return (
    <div className="mt-12 flex flex-col gap-3 lg:mt-16">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "h-4 w-full",
            index === lines - 1 && "w-4/5",
            index % 4 === 3 && "w-11/12"
          )}
        />
      ))}
    </div>
  );
}

export function CoverSkeleton() {
  return (
    <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-foreground/[0.03] p-1.5">
      <Skeleton className="aspect-[21/9] w-full rounded-[calc(2rem-0.375rem)]" />
    </div>
  );
}

export function MediaCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className="rounded-[2rem] border border-border bg-foreground/[0.03] p-1.5">
      <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] border border-border/60 bg-card">
        <Skeleton className={cn("w-full", featured ? "aspect-[16/10]" : "aspect-[16/10]")} />
        <div className="space-y-3 p-5 sm:p-6">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
          <Skeleton className="h-3 w-4/5 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function MediaCardGridSkeleton({
  count = 6,
  columns = "grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6",
}: {
  count?: number;
  columns?: string;
}) {
  return (
    <div className={cn("mt-14 grid", columns)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            index === 0 && "lg:col-span-7 lg:row-span-2",
            index > 0 && index <= 2 && "lg:col-span-5 lg:col-start-8",
            index > 2 && "lg:col-span-6"
          )}
        >
          <MediaCardSkeleton featured={index === 0} />
        </div>
      ))}
    </div>
  );
}

export function ShelfCardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-border bg-card p-3">
          <Skeleton className="aspect-[3/4] w-full rounded-xl" />
          <Skeleton className="mt-3 h-4 w-3/4" />
          <Skeleton className="mt-2 h-3 w-1/2 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function GallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card">
          <Skeleton
            className={cn(
              "w-full",
              index % 3 === 0 ? "aspect-[4/3]" : index % 3 === 1 ? "aspect-square" : "aspect-[3/4]"
            )}
          />
          <div className="space-y-2 px-4 py-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LifeGallerySkeleton({ count = 5 }: { count?: number }) {
  return (
    <section className="mt-20 border-t border-border pt-16 sm:mt-24 sm:pt-20">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-3 w-12 rounded-full" />
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton
            key={index}
            className={cn(
              "w-full",
              index === 0 && "sm:col-span-2 aspect-[16/10]",
              index === 1 && "aspect-[3/4]",
              index > 1 && (index % 2 === 0 ? "aspect-[4/3]" : "aspect-square")
            )}
          />
        ))}
      </div>
    </section>
  );
}

export function GearListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-28 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export function TracksListSkeleton() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function HomeSectionSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Skeleton className="h-3 w-10 rounded-full" />
          <Skeleton className="mt-3 h-10 w-full max-w-[12rem]" />
        </div>
        <div className="space-y-3 lg:col-span-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function NavigationContentSkeleton() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-44 w-full rounded-[2rem] sm:h-48"
        />
      ))}
    </div>
  );
}

/** Stable shell used for route transitions and loading states. */
export function NavigationPageSkeleton() {
  return (
    <PageShellSkeleton>
      <div className="motion-safe:animate-fade-up" style={{ animationDelay: "0ms" }}>
        <PageHeaderSkeleton />
      </div>
      <div
        className="motion-safe:animate-fade-up"
        style={{ animationDelay: "80ms" }}
      >
        <NavigationContentSkeleton />
      </div>
    </PageShellSkeleton>
  );
}

export function DefaultPageSkeleton() {
  return (
    <PageShellSkeleton>
      <PageHeaderSkeleton />
      <MediaCardGridSkeleton count={4} columns="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2" />
    </PageShellSkeleton>
  );
}

export function AboutPageSkeleton() {
  return (
    <PageShellSkeleton>
      <PageHeaderSkeleton />
      <CoverSkeleton />
      <ProseSkeleton />
      <LifeGallerySkeleton />
    </PageShellSkeleton>
  );
}

export function HomePageSkeleton() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-border/60">
        <PageShellSkeleton className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="space-y-6 lg:col-span-7">
              <Skeleton className="h-6 w-48 rounded-full" />
              <Skeleton className="h-16 w-full max-w-lg" />
              <Skeleton className="h-16 w-full max-w-md" />
              <Skeleton className="h-5 w-full max-w-md" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
            <Skeleton className="h-[22rem] w-full rounded-[2rem] lg:col-span-5" />
          </div>
        </PageShellSkeleton>
      </div>
      <HomeSectionSkeleton />
      <HomeSectionSkeleton />
    </>
  );
}
