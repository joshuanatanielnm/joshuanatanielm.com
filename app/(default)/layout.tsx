"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </main>
  );
}
