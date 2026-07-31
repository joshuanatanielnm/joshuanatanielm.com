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
          className="drafting-grid pointer-events-none fixed inset-0 z-[1]"
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
