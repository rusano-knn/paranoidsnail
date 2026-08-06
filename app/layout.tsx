import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { ThemeInit } from "@/components/ThemeInit";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});
const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/snail.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeInit />
        <Nav />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
