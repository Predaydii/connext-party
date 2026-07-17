import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PolicyGallery from "@/components/PolicyGallery";

export const metadata: Metadata = {
  title: "นโยบายพรรค | พรรคคอนเน็กซ์",
};

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        title="นโยบายทำได้จริง"
        subtitle="ผ่านการปรึกษาฝ่ายบริหารและคุณครูผู้เกี่ยวข้อง"
        image="/images/page-hero/policy.png"
      />

      {/* รูปชุดเดียวกับการ์ดวิสัยทัศน์ เรียงตามลำดับ กดเพื่อดูเต็มจอ */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <PolicyGallery />
      </section>
    </>
  );
}
