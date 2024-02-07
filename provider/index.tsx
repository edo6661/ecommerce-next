"use client";

import ThemeProvider from "@/components/provider/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "sonner";

function Provider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return (
    <>
      <ClerkProvider>
        <ThemeProvider attribute="class" enableSystem>
          <Toaster position="bottom-center" />
          <QueryClientProvider client={client}>
            {children}
            {/* <ReactQueryDevtools /> */}
          </QueryClientProvider>
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
}

export default Provider;
