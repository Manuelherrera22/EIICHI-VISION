import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Komorebi House | Build Your Future. Honor The Past.",
  description: "Invest in Japan's heritage homes, guided by the legacy of traditional architecture. Transform akiya properties in Gunma into valuable assets and dream homes.",
  keywords: "Japan real estate, akiya, heritage homes, Gunma, traditional houses, investment, renovation, komorebi",
  authors: [{ name: "Komorebi House" }],
  creator: "Komorebi House",
  publisher: "Komorebi House",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.komorebihouse.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ja-JP": "/ja",
    },
  },
  openGraph: {
    title: "Komorebi House | Build Your Future. Honor The Past.",
    description: "Invest in Japan's heritage homes, guided by the legacy of traditional architecture.",
    url: "https://www.komorebihouse.com",
    siteName: "Komorebi House",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Komorebi House - Japanese Heritage Homes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Komorebi House | Build Your Future. Honor The Past.",
    description: "Invest in Japan's heritage homes, guided by the legacy of traditional architecture.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics gaId="G-XXXXXXXXXX" />
        {children}
      </body>
    </html>
  );
}
