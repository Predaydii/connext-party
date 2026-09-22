import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getContent } from "@/lib/content/store";

/* แผนผังเว็บให้ Google ไล่เก็บครบทุกหน้า รวมข่าวที่แอดมินเพิ่งเขียน */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/leaders`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/members`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/policies`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/news`, changeFrequency: "daily", priority: 0.9 },
  ];

  const newsPages: MetadataRoute.Sitemap = content.news.map((item) => ({
    url: `${SITE_URL}/news/${item.id}`,
    lastModified: new Date(item.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...newsPages];
}
