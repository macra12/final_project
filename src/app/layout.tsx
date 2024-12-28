// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "GiveHope - Make a Difference",
    template: "%s | GiveHope Donation Platform"
  },
  description: "Join GiveHope to support meaningful causes and create positive change in communities worldwide.",
  keywords: [
    "donation platform",
    "charity",
    "fundraising",
    "nonprofit",
    "giving",
    "social impact",
    "community support",
    "charitable giving"
  ],
  authors: [
    {
      name: "GiveHope Team",
      url: "https://givehope.org",
    },
  ],
  creator: "GiveHope Organization",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://givehope.org",
    title: "GiveHope - Make a Difference",
    description: "Join GiveHope to support meaningful causes and create positive change.",
    siteName: "GiveHope",
  },
  twitter: {
    card: "summary_large_image",
    title: "GiveHope - Make a Difference",
    description: "Support meaningful causes and create positive change",
    creator: "@givehope",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-gray-50 flex flex-col">
        {/* Accessibility skip link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>

        {/* Main layout structure */}
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}