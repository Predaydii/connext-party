import type { Metadata } from "next";
import DocumentGallery from "@/components/DocumentGallery";
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

      {/* เอกสารแนะนำพรรค (รูปขนาด A4 กดเพื่อดูเต็มจอ) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <DocumentGallery />
      </section>
    </>
  );
}
