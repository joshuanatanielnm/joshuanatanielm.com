"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useNavigation } from "@/components/navigation/navigation-provider";

export function ScrollTriggerRefresh() {
  const pathname = usePathname();
  const { phase } = useNavigation();

  useEffect(() => {
    registerGsap();

    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, phase]);

  return null;
}
