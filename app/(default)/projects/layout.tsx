import { Footer } from "@/components/ui/footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <div className="flex py-14">
        <Footer />
      </div>
    </div>
  );
}
