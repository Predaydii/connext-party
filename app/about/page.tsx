import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "เกี่ยวกับพรรค | พรรคคอนเน็กซ์",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="บริหารจัดการอย่างเป็นระบบ"
        subtitle="ด้วยเทคโนโลยีดิจิทัลและการบริหารจัดการแบบมีส่วนร่วม"
        image="/images/page-hero/about.png"
      />

      {/* เอกสารจาก Google Drive — อ่านในเว็บได้เลยทุกอุปกรณ์ */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
          <iframe
            src="https://drive.google.com/file/d/1slyjUjqqWC7WV96-e0Jqs6IozZ6ehku-/preview"
            title="เอกสารแนะนำพรรคคอนเน็กซ์"
            allow="autoplay"
            className="h-[70vh] w-full sm:h-[85vh]"
          />
        </div>
      </section>
    </>
  );
}
