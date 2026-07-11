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
  title: "พรรคคอนเน็กซ์ - Connext Party",
  description: "ผู้นำพลังใหม่ ที่พร้อมสร้างสรรค์สิ่งดี สานต่อวัฒนธรรม ปฏิรูปการบริหารจัดการด้วยเทคโนโลยีดิจิทัล และสร้างวัฒนธรรมองค์กรที่ยั่งยืน เพราะเราเชื่อว่า ตราษฯ เป็นได้มากกว่านี้",
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
