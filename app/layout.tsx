import { satoshi } from "@/fonts";

import "./globals.css";

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
