"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <KindeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </KindeProvider>
  );
}
