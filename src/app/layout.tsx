import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.scss";

const raleway = Raleway({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
};

export const viewport: Viewport = {
  themeColor: "#090e16",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={raleway.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
