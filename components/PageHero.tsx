import SmartImage from "@/components/SmartImage";

/* Hero หัวข้อของแต่ละหน้า: ภาพพื้นหลัง + จางด้วยสีน้ำเงินแบบเดียวกับ section นับถอยหลัง
   ถ้ายังไม่วางไฟล์ภาพ จะเห็น gradient น้ำเงินแทน */
export default function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-connext-primary via-connext-secondary to-connext-light" />
      <SmartImage src={image} alt={title} sizes="100vw" priority />
      {/* overlay น้ำเงินโปร่งแสงให้ตัวหนังสือเด่น */}
      <div className="absolute inset-0 bg-connext-primary/70" />

      {/* ภาพพื้นหลังแนะนำ 1920x1080 (16:9) — ความสูง hero ล็อกตามสัดส่วนภาพบนจอใหญ่
          เพื่อให้เห็นภาพเกือบเต็มเฟรมไม่โดน crop เกินจำเป็น (สูงสุด 560px) */}
      <div className="relative mx-auto flex min-h-[240px] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center text-white sm:min-h-[320px] sm:px-6 sm:py-24 lg:min-h-[min(36vw,560px)]">
        <h1 className="text-3xl font-extrabold drop-shadow sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-base text-white/85 sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
