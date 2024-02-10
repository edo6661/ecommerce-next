import ThemeProvider from "@/components/provider/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { poppins } from "@/lib/utils";
import { StrictMode } from "react";
import Provider from "@/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={poppins.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
