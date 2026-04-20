import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL('https://autohtml.vercel.app'),
  title: "후한의원 구미점",
  description: "구미 여드름, 다이어트, 교통사고 치료 한의원 - 후한의원 구미점입니다.",
  verification: {
    google: "w5NQ-WHd-o_hcKnF8bJoc-WAOklZtZcNapkaNAwDm6A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
