import SmartImage from "@/components/SmartImage";
import type { ClassGroup } from "@/lib/data/members";

const CARD_GRADIENTS = [
  "from-connext-primary to-connext-secondary",
  "from-connext-secondary to-connext-light",
  "from-connext-light to-connext-primary",
  "from-blue-900 to-connext-secondary",
];

export default function ClassMemberSection({ group }: { group: ClassGroup }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <h2 className="text-2xl font-extrabold text-connext-primary sm:text-3xl">
        {group.className}
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-3 min-[480px]:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {group.members.map((member, i) => (
          <div
            key={member.id}
            className={`relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br shadow transition duration-300 hover:-translate-y-1.5 hover:shadow-lg ${
              CARD_GRADIENTS[i % CARD_GRADIENTS.length]
            }`}
          >
            {/* วางรูปตาม path ใน lib/data/members.ts แล้วรูปจะทับ placeholder เอง */}
            <SmartImage
              src={member.image}
              alt="สมาชิกพรรคคอนเน็กซ์"
              sizes="(min-width: 1280px) 17vw, (min-width: 768px) 25vw, 50vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
