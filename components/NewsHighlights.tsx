import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import type { NewsItem } from "@/lib/content/types";
import { formatThaiDate } from "@/lib/format";

/* แถบข่าวล่าสุด 3 ข่าวบนหน้าหลัก — ซ่อนตัวเองถ้ายังไม่มีข่าว (เช็คที่หน้าเรียกใช้) */
export default function NewsHighlights({ news }: { news: NewsItem[] }) {
  return (
    <section className="bg-gray-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold text-connext-primary sm:text-4xl">
          ข่าวกิจกรรม
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group block overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-connext-primary to-connext-secondary">
                {item.images[0] && (
                  <SmartImage
                    src={item.images[0]}
                    alt={item.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw"
                  />
                )}
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-2 text-xs font-semibold text-connext-secondary">
                  <time dateTime={item.date}>{formatThaiDate(item.date)}</time>
                  {item.location && (
                    <>
                      <span aria-hidden className="text-gray-300">·</span>
                      <span className="text-gray-500">{item.location}</span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-connext-primary">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/news"
            className="glow-button group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-connext-primary-contrast shadow-lg shadow-connext-primary/30 transition duration-300 hover:scale-110 hover:shadow-xl hover:shadow-connext-secondary/50 active:scale-95"
          >
            ดูข่าวทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
}
