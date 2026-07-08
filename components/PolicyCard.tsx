import SmartImage from "@/components/SmartImage";
import type { Policy } from "@/lib/data/policies";

export default function PolicyCard({ policy }: { policy: Policy }) {
  return (
    <article className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
      {/* รูป 4:5 — วางไฟล์ตาม path ใน lib/data/policies.ts */}
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-connext-secondary to-connext-light shadow-lg md:mx-0 md:max-w-xs">
        <SmartImage
          src={policy.image}
          alt={policy.title}
          sizes="(min-width: 768px) 320px, 260px"
        />
      </div>

      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">{policy.title}</h2>

        <h3 className="mt-8 text-lg font-bold text-gray-900 sm:text-xl">คำอธิบาย</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
          {policy.description}
        </p>

        {policy.benefits.length > 0 && (
          <>
            <h3 className="mt-8 text-lg font-bold text-gray-900 sm:text-xl">ข้อดี/ประโยชน์</h3>
            <ul className="mt-3 space-y-2">
              {policy.benefits.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-gray-600 sm:text-base"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-connext-secondary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}
