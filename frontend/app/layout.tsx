"use client";

import "./../styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
