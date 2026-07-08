import SmartImage from "@/components/SmartImage";

type MarqueeMember = {
  id: string;
  image: string;
  placeholderClass: string;
};

const PLACEHOLDER_CLASSES = [
  "from-connext-primary to-connext-secondary",
  "from-connext-secondary to-connext-light",
  "from-connext-light to-connext-primary",
  "from-blue-900 to-connext-secondary",
  "from-sky-400 to-connext-primary",
];

// วางรูป 4:5 (1080x1350) ที่ public/images/home-members/member-1.png ... member-27.png
const makeRow = (rowKey: string, startNo: number, count: number): MarqueeMember[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${rowKey}-${i + 1}`,
    image: `/images/home-members/member-${startNo + i}.png`,
    placeholderClass: PLACEHOLDER_CLASSES[i % PLACEHOLDER_CLASSES.length],
  }));

const ROW_ONE = makeRow("m1", 1, 14);
const ROW_TWO = makeRow("m2", 15, 12);

function MemberCard({ member }: { member: MarqueeMember }) {
  return (
    <div
      className={`relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br sm:w-44 lg:w-52 ${member.placeholderClass}`}
    >
      <SmartImage
        src={member.image}
        alt="สมาชิกพรรคคอนเน็กซ์"
        className="pointer-events-none object-cover"
        sizes="(min-width: 1024px) 208px, (min-width: 640px) 176px, 144px"
      />
    </div>
  );
}

function MarqueeRow({ members, fast }: { members: MarqueeMember[]; fast?: boolean }) {
  return (
    <div className="overflow-hidden" role="list">
      <div
        className={`flex w-max gap-3 sm:gap-4 ${fast ? "member-marquee-fast" : "member-marquee"}`}
      >
        {/* duplicate the set once so translateX(-50%) loops seamlessly */}
        {[...members, ...members].map((member, i) => (
          <div role="listitem" key={`${member.id}-${i}`} aria-hidden={i >= members.length}>
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MemberMarquee() {
  return (
    <section className="overflow-hidden bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold text-connext-primary sm:text-4xl">
          สมาชิกพรรค
        </h2>
      </div>
      <div className="mt-10 space-y-4 sm:mt-14">
        <MarqueeRow members={ROW_ONE} />
        <MarqueeRow members={ROW_TWO} fast />
      </div>
    </section>
  );
}
