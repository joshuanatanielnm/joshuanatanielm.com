import { ReactNode } from "react";
import { SiteNav } from "@/components/ui/site-nav";
import { Footer } from "@/components/ui/footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
