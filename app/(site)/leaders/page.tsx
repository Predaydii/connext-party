import type { Metadata } from "next";
import LeaderProfileCard from "@/components/LeaderProfileCard";
import PageHero from "@/components/PageHero";
import { getContent } from "@/lib/content/store";

export const metadata: Metadata = {
  title: "ประวัติแกนนำ",
  description:
    "ประวัติ ประสบการณ์ และผลงานของแกนนำพรรคคอนเน็กซ์ (Connext Party) ผู้ลงสมัครสภานักเรียนโรงเรียนตราษตระการคุณ",
  alternates: { canonical: "/leaders" },
  openGraph: {
    title: "ประวัติแกนนำ | พรรคคอนเน็กซ์ Connext Party",
    description:
      "ประวัติ ประสบการณ์ และผลงานของแกนนำพรรคคอนเน็กซ์ ผู้ลงสมัครสภานักเรียนโรงเรียนตราษตระการคุณ",
    url: "/leaders",
  },
};

export default async function LeadersPage() {
  const content = await getContent();

  return (
    <>
      <PageHero
        title="Future Leader"
        subtitle="ผู้นำพลังใหม่ของพรรคคอนเน็กซ์"
        image="/images/page-hero/leaders.png"
      />

      {/* สลับพื้นหลังขาว/ฟ้าอ่อนคั่นแต่ละโปรไฟล์ */}
      {content.leaders.map((leader, i) => (
        <section
          key={leader.id}
          className={i % 2 === 1 ? "bg-connext-light/10" : "bg-white"}
        >
          <div className="px-4 py-14 sm:px-6 sm:py-20">
            <LeaderProfileCard leader={leader} />
          </div>
        </section>
      ))}
    </>
  );
}
