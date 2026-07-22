"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { navLinks } from "@/app/(default)/links";

const ROUTES = ["/", ...navLinks.map((link) => link.href)];

export function PrefetchRoutes() {
  const router = useRouter();

  useEffect(() => {
    const prefetchAll = () => {
      for (const href of ROUTES) {
        router.prefetch(href);
      }
    };

    const schedule =
      typeof window.requestIdleCallback === "function"
        ? (cb: () => void) =>
            window.requestIdleCallback(cb, { timeout: 2000 })
        : (cb: () => void) => window.setTimeout(cb, 1);

    const cancel =
      typeof window.cancelIdleCallback === "function"
        ? window.cancelIdleCallback.bind(window)
        : window.clearTimeout.bind(window);

    const id = schedule(prefetchAll);
    return () => cancel(id);
  }, [router]);

  return null;
}
