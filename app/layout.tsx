import type { Metadata } from "next";
import { satoshi } from "@/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant Searcher",
  description: "Restaurant Searcher App - beta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.className} flex content-center items-center m-auto flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
