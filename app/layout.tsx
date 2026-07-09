import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-sans-thai",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://connext-party.space"),
  title: "พรรคคอนเน็กซ์ | Connext Party",
  description: "ตราษฯ เป็นได้มากกว่านี้ — เว็บไซต์หาเสียงของพรรคคอนเน็กซ์ (Connext) เบอร์ 1",
  openGraph: {
    title: "พรรคคอนเน็กซ์ | Connext Party",
    description: "ตราษฯ เป็นได้มากกว่านี้ — ผู้นำพลังใหม่ สร้างสรรค์สิ่งดี ก้าวไกลด้วยเทคโนโลยีดิจิทัล เลือกพวกเราเบอร์ 1",
    url: "https://connext-party.space",
    siteName: "Connext Party",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "พรรคคอนเน็กซ์ - Connext Party",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "พรรคคอนเน็กซ์ | Connext Party",
    description: "ตราษฯ เป็นได้มากกว่านี้ — เลือกพวกเราเบอร์ 1",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${notoSansThai.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
