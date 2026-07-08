import type { Metadata } from "next";
import ClassMemberSection from "@/components/ClassMemberSection";
import PageHero from "@/components/PageHero";
import { classGroups } from "@/lib/data/members";

export const metadata: Metadata = {
  title: "สมาชิกพรรค | พรรคคอนเน็กซ์",
};

export default function MembersPage() {
  return (
    <>
      {/* วางภาพหมู่พรรคที่ public/images/members/group.png แล้วภาพจะขึ้นแทน gradient เอง */}
      <PageHero
        title="26 คนทำงาน"
        subtitle="มากความสามารถ เพรียบพร้อมประสบการณ์"
        image="/images/page-hero/group.png"
      />

      <div className="py-6 sm:py-10">
        {classGroups.map((group) => (
          <ClassMemberSection key={group.className} group={group} />
        ))}
      </div>
    </>
  );
}
