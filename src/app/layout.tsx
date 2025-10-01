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
  title: "Tabiji House | Construye tu Futuro. Honra el Pasado.",
  description: "Invierte en casas patrimoniales japonesas, guiado por el legado de la arquitectura tradicional. Transforma propiedades akiya en Gunma en activos valiosos y hogares de ensueño.",
  keywords: "bienes raíces Japón, akiya, casas patrimoniales, Gunma, casas tradicionales, inversión, renovación, tabiji",
  openGraph: {
    title: "Tabiji House | Construye tu Futuro. Honra el Pasado.",
    description: "Invierte en casas patrimoniales japonesas, guiado por el legado de la arquitectura tradicional.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Establecer el título inmediatamente para evitar mostrar "localhost"
              document.title = "Tabiji House | Construye tu Futuro. Honra el Pasado.";
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
                {children}
              </ModalProvider>
            </ArquitectoProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
