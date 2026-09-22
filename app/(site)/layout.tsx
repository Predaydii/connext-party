import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

/* Layout ของเว็บฝั่งผู้เข้าชม — มี Navbar/Footer
   หน้า /admin อยู่นอก group นี้ เลยไม่มีแถบเมนูมากวน */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
