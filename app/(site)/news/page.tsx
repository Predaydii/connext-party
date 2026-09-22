import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SmartImage from "@/components/SmartImage";
import { getContent } from "@/lib/content/store";
import { formatThaiDate, sortNewsByDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "ข่าวกิจกรรม",
  description:
    "ข่าวสารและกิจกรรมล่าสุดของพรรคคอนเน็กซ์ (Connext Party) โรงเรียนตราษตระการคุณ — ติดตามความเคลื่อนไหว ผลงาน และกิจกรรมที่คอนเน็กซ์ลงมือทำจริง",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "ข่าวกิจกรรม | พรรคคอนเน็กซ์ Connext Party",
    description:
      "ข่าวสารและกิจกรรมล่าสุดของพรรคคอนเน็กซ์ (Connext Party) โรงเรียนตราษตระการคุณ",
    url: "/news",
  },
};

export default async function NewsPage() {
  const content = await getContent();
  const news = sortNewsByDate(content.news);

  return (
    <>
      <PageHero
        title="ข่าวกิจกรรม"
        subtitle="ความเคลื่อนไหวล่าสุดของพรรคคอนเน็กซ์"
        image="/images/page-hero/group.png"
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {news.length === 0 ? (
          <p className="rounded-2xl bg-gray-50 px-6 py-16 text-center text-gray-500">
            ยังไม่มีข่าวกิจกรรมในตอนนี้ — ไว้กลับมาดูใหม่เร็ว ๆ นี้
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article key={item.id}>
                <Link
                  href={`/news/${item.id}`}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-connext-primary to-connext-secondary">
                    {item.images[0] && (
                      <SmartImage
                        src={item.images[0]}
                        alt={item.title}
                        sizes="(min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-connext-secondary">
                      <time dateTime={item.date}>{formatThaiDate(item.date)}</time>
                      {item.location && (
                        <>
                          <span aria-hidden className="text-gray-300">
                            ·
                          </span>
                          <span className="text-gray-500">{item.location}</span>
                        </>
                      )}
                    </div>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-connext-primary">
                      {item.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                      {item.body}
                    </p>
                    <span className="mt-3 inline-block text-sm font-semibold text-connext-primary">
                      อ่านต่อ →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
