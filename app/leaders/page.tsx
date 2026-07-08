import type { Metadata } from "next";
import LeaderProfileCard from "@/components/LeaderProfileCard";
import PageHero from "@/components/PageHero";
import { leaders } from "@/lib/data/leaders";

export const metadata: Metadata = {
  title: "ประวัติแกนนำ | พรรคคอนเน็กซ์",
};

export default function LeadersPage() {
  return (
    <>
      <PageHero
        title="Future Leader"
        subtitle="ผู้นำพลังใหม่ของพรรคคอนเน็กซ์"
        image="/images/page-hero/leaders.png"
      />

      {/* สลับพื้นหลังขาว/ฟ้าอ่อนคั่นแต่ละโปรไฟล์ */}
      {leaders.map((leader, i) => (
        <section
          key={leader.name}
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
