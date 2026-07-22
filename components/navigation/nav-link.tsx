"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  startTransition,
  useCallback,
  type ComponentProps,
  type MouseEvent,
} from "react";
import { useNavigation } from "@/components/navigation/navigation-provider";
import { normalizePath } from "@/lib/normalize-path";

type NavLinkProps = ComponentProps<typeof Link>;

function hrefToPath(href: NavLinkProps["href"]) {
  if (typeof href === "string") return href;
  if (typeof href === "object" && href.pathname) return href.pathname;
  return "";
}

function isInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

export function NavLink({
  href,
  onClick,
  prefetch = true,
  onMouseEnter,
  onFocus,
  ...props
}: NavLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { startNavigation } = useNavigation();
  const path = hrefToPath(href);
  const normalizedPath = normalizePath(path);
  const normalizedCurrent = normalizePath(pathname);

  const prefetchRoute = useCallback(() => {
    if (isInternalPath(path)) {
      router.prefetch(path);
    }
  }, [path, router]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    if (!isInternalPath(path) || normalizedPath === normalizedCurrent) {
      return;
    }

    event.preventDefault();
    startNavigation(path);
    startTransition(() => {
      router.push(path);
    });
  };

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onMouseEnter={(event) => {
        prefetchRoute();
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        prefetchRoute();
        onFocus?.(event);
      }}
      onTouchStart={prefetchRoute}
      onClick={handleClick}
      aria-current={normalizedPath === normalizedCurrent ? "page" : undefined}
      {...props}
    />
  );
}
