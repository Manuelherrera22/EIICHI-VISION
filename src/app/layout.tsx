import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ArquitectoProvider } from "@/contexts/ArquitectoContext";
import { ModalProvider } from "@/contexts/ModalContext";
import DynamicMetadata from "@/components/DynamicMetadata";
import TitleManager from "@/components/TitleManager";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import ServiceWorkerCleanup from "@/components/ServiceWorkerCleanup";

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
  title: "Tabiji House | Build Your Future. Honor the Past.",
  description: "Invest in Japanese heritage houses, guided by traditional architecture legacy. Transform akiya properties in Gunma into valuable assets and dream homes.",
  keywords: "Japanese real estate, akiya, heritage houses, Gunma, traditional houses, investment, renovation, tabiji",
  openGraph: {
    title: "Tabiji House | Build Your Future. Honor the Past.",
    description: "Invest in Japanese heritage houses, guided by traditional architecture legacy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon-new.ico?v=3" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/tabijihouse-removebg-preview.png?v=2" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Set title immediately to avoid showing "localhost"
              document.title = "Tabiji House | Build Your Future. Honor the Past.";
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <AuthProvider>
            <ArquitectoProvider>
              <ModalProvider>
                <TitleManager />
                <DynamicMetadata />
                <Analytics gaId="G-XXXXXXXXXX" />
                <ServiceWorkerRegistration />
                <ServiceWorkerCleanup />
                {children}
              </ModalProvider>
            </ArquitectoProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
