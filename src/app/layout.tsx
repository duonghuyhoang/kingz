import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.scss";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KINGZ",
  description: "Website website belongs to KingZ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
