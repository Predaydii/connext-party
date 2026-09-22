import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-sans-thai",
});

const SITE_TITLE = "พรรคคอนเน็กซ์ - Connext Party";
const SITE_DESCRIPTION =
  "พรรคคอนเน็กซ์ (Connext Party) ผู้นำพลังใหม่ ที่พร้อมสร้างสรรค์สิ่งดี สานต่อวัฒนธรรม ปฏิรูปการบริหารจัดการด้วยเทคโนโลยีดิจิทัล และสร้างวัฒนธรรมองค์กรที่ยั่งยืน เพราะเราเชื่อว่า ตราษฯ เป็นได้มากกว่านี้";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // %s = ชื่อหน้าย่อย — ทุกหน้าจะมีคำว่า "คอนเน็กซ์" ต่อท้ายอัตโนมัติ ช่วยให้ติดคำค้นนี้ทั้งเว็บ
  title: {
    default: SITE_TITLE,
    template: "%s | พรรคคอนเน็กซ์ Connext Party",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Connext Party",
  keywords: [
    "Connext",
    "คอนเน็กซ์",
    "พรรคคอนเน็กซ์",
    "Connext Party",
    "connext party",
    "พรรค Connext",
    "คอนเน็กซ์ ตราษ",
    "Connext ตราษตระการคุณ",
    "พรรคคอนเน็กซ์ ตราษตระการคุณ",
    "สภานักเรียนตราษตระการคุณ",
    "เลือกตั้งสภานักเรียน",
    "ตราษฯ เป็นได้มากกว่านี้",
  ],
  authors: [{ name: "พรรคคอนเน็กซ์ (Connext Party)" }],
  creator: "พรรคคอนเน็กซ์ (Connext Party)",
  publisher: "พรรคคอนเน็กซ์ (Connext Party)",
  category: "การศึกษา",
  alternates: { canonical: "/" },
  // openGraph/twitter คือตัวกำหนดการ์ดพรีวิวตอนแชร์ลิงก์ — ถ้าลบบล็อกนี้ รูปแบนเนอร์จะหาย
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "พรรคคอนเน็กซ์ Connext Party",
    locale: "th_TH",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
        {children}
        {/* Vercel Web Analytics — ยิงข้อมูลเฉพาะตอน deploy บน Vercel, ตอน dev ไม่ส่งอะไร */}
        <Analytics />
      </body>
    </html>
  );
}
