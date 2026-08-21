import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import siteConfigRaw from "../../site.config.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${siteConfigRaw.businessName} - ${siteConfigRaw.tagline}`,
  description: `${siteConfigRaw.businessName}: ${siteConfigRaw.industry}. ${siteConfigRaw.tagline}.`,
  keywords: [siteConfigRaw.businessName, siteConfigRaw.industry, "Cotizador", "Servicios", "Catálogo"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
