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

const SITE_TITLE = "พรรคคอนเน็กซ์ - Connext Party";
const SITE_DESCRIPTION =
  "ผู้นำพลังใหม่ ที่พร้อมสร้างสรรค์สิ่งดี สานต่อวัฒนธรรม ปฏิรูปการบริหารจัดการด้วยเทคโนโลยีดิจิทัล และสร้างวัฒนธรรมองค์กรที่ยั่งยืน เพราะเราเชื่อว่า ตราษฯ เป็นได้มากกว่านี้";

export const metadata: Metadata = {
  metadataBase: new URL("https://connext-party.space"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // openGraph/twitter คือตัวกำหนดการ์ดพรีวิวตอนแชร์ลิงก์ — ถ้าลบบล็อกนี้ รูปแบนเนอร์จะหาย
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://connext-party.space",
    siteName: "Connext Party",
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
