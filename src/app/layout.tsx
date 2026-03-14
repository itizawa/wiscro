import { Footer } from "@/components/Footer";
import Header from "@/components/header/header";
import ThemeRegistry from "@/components/ThemeRegistry";
import { generateMetadataObject } from "@/shared/lib/generateMetadataObject";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ffb86a",
};

export const metadata: Metadata = generateMetadataObject();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <link rel="manifest" href="/manifest.json" />
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ minHeight: "100vh" }}
      >
        <ThemeRegistry>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
