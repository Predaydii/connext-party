import FeatureVideo from "@/components/FeatureVideo";
import SmartImage from "@/components/SmartImage";

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  media: "video" | "image";
  src: string;
  placeholderClass: string;
};

// วิดีโอ: public/videos/culture.mp4 | รูป: public/images/features/*.png
const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "culture",
    title: "ส่งเสริมกิจกรรม เปิดกว้างทุกความเห็น",
    description:
      'จัดทำแบบสำรวจความสนใจ เช่น คอนเสิร์ต, E-Sport, บาสเกตบอลประเพณี, ฟุตบอลประเพณี, Cover Dance',
    media: "image",
    src: "/images/features/culture.jpg",
    placeholderClass: "from-blue-900 via-connext-primary to-connext-secondary",
  },
  {
    id: "technology",
    title: "สภาดิจิทัล",
    description:
      "นำเทคโนโลยีมาใช้ในการบริการและบริหารจัดการ เพื่อประโยชน์ต่อนักเรียนและคุณครูทุกคน",
    media: "image",
    src: "/images/features/technology.jpg",
    placeholderClass: "from-connext-secondary via-connext-light to-sky-200",
  },
  {
    id: "leaders",
    title: "ผู้นำพลังใหม่",
    description: "ทีมงานคุณภาพ มากประสบการณ์ ผลงานเป็นที่ประจักษ์ ระดับท็อปของโรงเรียนในทุกด้าน",
    media: "image",
    src: "/images/features/leader.jpg",
    placeholderClass: "from-blue-900 via-connext-primary to-connext-secondary",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-gray-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold text-connext-primary sm:text-4xl">
          ทำไมต้องคอนเน็กซ์
        </h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 px-4 sm:mt-14 sm:px-6 md:grid-cols-3 lg:gap-6">
        {FEATURE_CARDS.map((card) => {
          const isVideo = card.media === "video";
          return (
            <article
              key={card.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-connext-primary/40 ${card.placeholderClass} ${
                "aspect-[4/5]"
              }`}
            >
              {isVideo ? (
                <FeatureVideo src={card.src} />
              ) : (
                <SmartImage
                  src={card.src}
                  alt={card.title}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              )}

              {/* gradient overlay for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

              <div
                className={`absolute inset-x-0 bottom-0 p-5 text-white sm:p-6 ${
                  isVideo ? "md:max-w-xl md:p-8" : ""
                }`}
              >
                <h3 className="text-xl font-bold sm:text-2xl">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{card.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
