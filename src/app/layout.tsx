import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
import { AnalyticsTracker } from "@/components/analytics-tracker";

export const metadata: Metadata = {
  metadataBase: new URL('https://autohtml.vercel.app'),
  title: {
    default: "후한의원 구미점 | 여드름·다이어트·피부질환·1인실입원",
    template: "%s | 후한의원 구미점",
  },
  description: "구미 여드름 흉터 복원, 체질 맞춤 다이어트 한약(미감탕), 사마귀/피부질환 치료, 365일 1인실 입원실 운영 - 후한의원 구미점 공식 블로그입니다.",
  keywords: [
    "구미 한의원",
    "후한의원 구미점",
    "구미 여드름",
    "구미 여드름 흉터",
    "구미 다이어트 한약",
    "미감탕",
    "비움탕",
    "다요스틱",
    "구미 사마귀",
    "구미 안면홍조",
    "구미 지루성피부염",
    "구미 교통사고 입원",
    "구미 1인실 한의원"
  ],
  authors: [{ name: "후한의원 구미점 이언호 원장" }],
  creator: "후한의원 구미점",
  publisher: "후한의원 구미점",
  formatDetection: {
    telephone: true,
    address: true,
  },
  other: {
    "google-adsense-account": "ca-pub-6770397884295603",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://autohtml.vercel.app",
    siteName: "후한의원 구미점 건강 매거진",
    title: "후한의원 구미점 | 여드름·다이어트·피부질환·입원실",
    description: "20년 노하우, 이언호 대표원장이 직접 진료하는 후한의원 구미점의 전문 건강 칼럼 및 진료 소식",
    images: [
      {
        url: "/images/hoo-clinic-gumi-logo.png",
        width: 800,
        height: 600,
        alt: "후한의원 구미점",
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
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
    <html lang="ko">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6770397884295603" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6770397884295603"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <AnalyticsTracker />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
