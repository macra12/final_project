import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Donation Platform",
    template: "%s | Donation Platform"
  },
  description: "A platform connecting donors with meaningful causes",
  keywords: ["donation", "charity", "fundraising", "nonprofit", "giving"],
  authors: [
    {
      name: "Your Name",
      url: "https://yourwebsite.com",
    },
  ],
  creator: "Your Name or Organization",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Donation Platform",
    description: "A platform connecting donors with meaningful causes",
    siteName: "Donation Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donation Platform",
    description: "A platform connecting donors with meaningful causes",
    creator: "@yourhandle",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gray-50 flex flex-col antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}