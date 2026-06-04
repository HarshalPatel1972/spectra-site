import type { Metadata } from "next";
import { Syne, Frances, JetBrains_Mono, Barlow_Condensed } from "next/font/google";
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

const frances = Frances({
  variable: "--font-frances",
  weight: ["400", "500", "600"],
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
    <html lang="en" className={`${barlowCondensed.variable} ${syne.variable} ${frances.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
