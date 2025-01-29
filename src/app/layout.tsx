"use client";

import Navigation from "@/ui/components/Navigation.component";
import { Toaster } from "@/ui/components/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <header>
            <Navigation />
          </header>
          <main className="flex h-screen flex-col items-start justify-start p-4">
            {children}
          </main>
          <Toaster richColors />
        </body>
      </QueryClientProvider>
    </html>
  );
}
