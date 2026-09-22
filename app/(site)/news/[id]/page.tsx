import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmartImage from "@/components/SmartImage";
import { getContent } from "@/lib/content/store";
import { formatThaiDate, sortNewsByDate } from "@/lib/format";
import { SITE_URL } from "@/lib/site";

type Props = { params: { id: string } };

async function findNews(id: string) {
  const content = await getContent();
  return content.news.find((item) => item.id === id) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await findNews(params.id);
  if (!item) return { title: "ไม่พบข่าว" };

  const description = `${formatThaiDate(item.date)}${
    item.location ? ` · ${item.location}` : ""
  } — ${item.body.slice(0, 150)}`;

  return {
    title: item.title,
    description,
    alternates: { canonical: `/news/${item.id}` },
    openGraph: {
      title: `${item.title} | พรรคคอนเน็กซ์ Connext Party`,
      description,
      url: `/news/${item.id}`,
      type: "article",
      publishedTime: item.createdAt,
      images: item.images[0] ? [{ url: item.images[0] }] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const item = await findNews(params.id);
  if (!item) notFound();

  const content = await getContent();
  const others = sortNewsByDate(content.news)
    .filter((n) => n.id !== item.id)
    .slice(0, 3);

  // JSON-LD ให้ Google เข้าใจว่านี่คือข่าวของพรรคคอนเน็กซ์
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: item.date,
    image: item.images.map((src) =>
      src.startsWith("http") ? src : `${SITE_URL}${src}`
    ),
    articleBody: item.body,
    ...(item.location && {
      contentLocation: { "@type": "Place", name: item.location },
    }),
    author: { "@type": "Organization", name: "พรรคคอนเน็กซ์ (Connext Party)" },
    publisher: {
      "@type": "Organization",
      name: "พรรคคอนเน็กซ์ (Connext Party)",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-blue.png` },
    },
    mainEntityOfPage: `${SITE_URL}/news/${item.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <Link
          href="/news"
          className="text-sm font-semibold text-connext-primary hover:underline"
        >
          ← กลับไปหน้าข่าวกิจกรรม
        </Link>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
          {item.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-connext-secondary">
            <span aria-hidden>📅</span>
            <time dateTime={item.date}>{formatThaiDate(item.date)}</time>
          </span>
          {item.location && (
            <span className="inline-flex items-center gap-1.5 text-gray-600">
              <span aria-hidden>📍</span>
              {item.location}
            </span>
          )}
        </div>

        {item.images[0] && (
          <div className="relative mt-7 aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-connext-primary to-connext-secondary shadow-lg">
            <SmartImage src={item.images[0]} alt={item.title} sizes="(min-width: 768px) 768px, 100vw" priority />
          </div>
        )}

        <div className="mt-7 space-y-4 text-base leading-relaxed text-gray-700">
          {item.body.split("\n").filter(Boolean).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {item.images.length > 1 && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {item.images.slice(1).map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow"
              >
                <SmartImage src={src} alt={item.title} sizes="33vw" />
              </div>
            ))}
          </div>
        )}
      </article>

      {others.length > 0 && (
        <section className="bg-gray-50 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-xl font-extrabold text-connext-primary sm:text-2xl">
              ข่าวอื่นของคอนเน็กซ์
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/news/${other.id}`}
                  className="group block overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-connext-primary to-connext-secondary">
                    {other.images[0] && (
                      <SmartImage src={other.images[0]} alt={other.title} sizes="33vw" />
                    )}
                  </div>
                  <div className="p-4">
                    <time
                      dateTime={other.date}
                      className="text-xs font-semibold text-connext-secondary"
                    >
                      {formatThaiDate(other.date)}
                    </time>
                    <p className="mt-1 line-clamp-2 text-sm font-bold text-gray-800 transition group-hover:text-connext-primary">
                      {other.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
