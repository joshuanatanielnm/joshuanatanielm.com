import { ReactNode } from "react";
import { NavigationProvider } from "@/components/navigation/navigation-provider";
import { NavigationShell } from "@/components/navigation/navigation-shell";
import { PrefetchRoutes } from "@/components/navigation/prefetch-routes";
import { ScrollTriggerRefresh } from "@/components/motion/scroll-trigger-refresh";
import { SiteRail } from "@/components/ui/site-rail";
import { Footer } from "@/components/ui/footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <NavigationProvider>
      <PrefetchRoutes />
      <ScrollTriggerRefresh />
      <div className="relative flex min-h-[100dvh] flex-col">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <SiteRail />
        <div className="relative z-[2] flex min-h-[100dvh] flex-1 flex-col lg:pl-52">
          <NavigationShell>{children}</NavigationShell>
          <Footer />
        </div>
      </div>
    </NavigationProvider>
  );
}
