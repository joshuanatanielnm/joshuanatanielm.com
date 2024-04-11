import { Footer } from "@/components/ui/footer";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <Link
        className="fixed bottom-0 mb-8 border p-2 rounded-lg border-solid border-orange-300 bg-orange-50 text-orange-500 hover:text-orange-700 hover:border-orange-400 hover:bg-orange-100"
        href="/"
      >{`<- Go Back`}</Link>
      <div className="flex py-14">
        <Footer />
      </div>
    </div>
  );
}
