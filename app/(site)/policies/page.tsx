import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PolicyGallery from "@/components/PolicyGallery";
import { getContent } from "@/lib/content/store";

export const metadata: Metadata = {
  title: "นโยบายพรรค",
  description:
    "นโยบายทั้งหมดของพรรคคอนเน็กซ์ (Connext Party) โรงเรียนตราษตระการคุณ — ผ่านการปรึกษาฝ่ายบริหารและคุณครูผู้เกี่ยวข้อง พร้อมสถานะว่านโยบายไหนทำสำเร็จแล้ว",
  alternates: { canonical: "/policies" },
  openGraph: {
    title: "นโยบายพรรค | พรรคคอนเน็กซ์ Connext Party",
    description:
      "นโยบายทั้งหมดของพรรคคอนเน็กซ์ พร้อมสถานะว่านโยบายไหนทำสำเร็จแล้ว",
    url: "/policies",
  },
};

export default async function PoliciesPage() {
  const content = await getContent();

  return (
    <>
      <PageHero
        title="นโยบายทำได้จริง"
        subtitle="ผ่านการปรึกษาฝ่ายบริหารและคุณครูผู้เกี่ยวข้อง"
        image="/images/page-hero/policy.png"
      />

      {/* รูปชุดเดียวกับการ์ดวิสัยทัศน์ เรียงตามลำดับ กดเพื่อดูเต็มจอ */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <PolicyGallery policyStatuses={content.policyStatuses} />
      </section>
    </>
  );
}
