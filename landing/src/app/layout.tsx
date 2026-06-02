import type { Metadata } from "next";
import { Syne, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  weight: ["700", "800"],
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${syne.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
