import type { Metadata } from "next";
import { Spectral, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  variable: "--font-spectral",
  weight: ["300", "400"],
  style: ["normal", "italic"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spectral.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
