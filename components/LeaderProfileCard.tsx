import SmartImage from "@/components/SmartImage";
import type { Leader } from "@/lib/data/leaders";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-gray-600 sm:text-base">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-connext-secondary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function LeaderProfileCard({ leader }: { leader: Leader }) {
  return (
    <article className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
      {/* รูป 4:5 — แทน placeholder ด้วย <Image> เมื่อมีรูปจริงใน public/images/leaders */}
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-connext-secondary to-connext-light shadow-lg md:mx-0 md:max-w-xs">
        <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full text-white/60" aria-hidden>
          <circle cx="50" cy="42" r="20" fill="currentColor" />
          <path d="M14 125 C14 88 34 74 50 74 C66 74 86 88 86 125 Z" fill="currentColor" />
        </svg>
        <SmartImage src={leader.image} alt={leader.name} sizes="(min-width: 768px) 320px, 260px" />
      </div>

      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">{leader.name}</h2>
        <p className="mt-1 text-base font-semibold text-connext-secondary sm:text-lg">
          {leader.position}
        </p>

        {leader.experience.length > 0 && (
          <>
            <h3 className="mt-8 text-lg font-bold text-gray-900 sm:text-xl">ประสบการณ์การทำงาน</h3>
            <BulletList items={leader.experience} />
          </>
        )}

        {leader.achievements.length > 0 && (
          <>
            <h3 className="mt-8 text-lg font-bold text-gray-900 sm:text-xl">รางวัลและความสำเร็จ</h3>
            <BulletList items={leader.achievements} />
          </>
        )}
      </div>
    </article>
  );
}
