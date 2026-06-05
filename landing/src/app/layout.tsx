import type { Metadata } from "next";
import { Syne, Anton, JetBrains_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spectra - Cryptographic Intelligence",
  description: "The forensic instrument that makes an organization's cryptographic landscape visible, scorable, and navigable.",
  icons: {
    icon: '/spectra-mark.svg',
  }
};

import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${syne.variable} ${anton.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-void min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
