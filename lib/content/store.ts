import { list, put } from "@vercel/blob";
import { unstable_cache, revalidateTag } from "next/cache";
import { defaultContent, normalizeContent } from "@/lib/content/defaults";
import type { SiteContent } from "@/lib/content/types";

const CONTENT_PATH = "content/site.json";
export const CONTENT_TAG = "site-content";

/** ยังไม่ได้ต่อ Blob store = เว็บวิ่งด้วยเนื้อหาเริ่มต้นใน lib/data ตามปกติ */
export function hasBlobStore(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function fetchContentFromBlob(): Promise<SiteContent> {
  if (!hasBlobStore()) return defaultContent();

  try {
    const { blobs } = await list({ prefix: CONTENT_PATH, limit: 1 });
    const blob = blobs.find((b) => b.pathname === CONTENT_PATH);
    if (!blob) return defaultContent();

    // ต่อ ?v=เวลาที่อัปโหลด เพื่อเลี่ยง CDN cache ของ Blob — list() ให้ข้อมูลสดเสมอ
    // เลยได้ URL ใหม่ทุกครั้งที่มีการบันทึก ทำให้แอดมินเห็นผลทันที
    const version = new Date(blob.uploadedAt).getTime();
    const res = await fetch(`${blob.url}?v=${version}`, { cache: "no-store" });
    if (!res.ok) return defaultContent();

    return normalizeContent(await res.json());
  } catch (error) {
    // อ่านไม่ได้ด้วยเหตุผลใดก็ตาม เว็บต้องไม่ล่ม — ตกกลับไปใช้ค่าเริ่มต้น
    console.error("[content] อ่านข้อมูลจาก Blob ไม่สำเร็จ:", error);
    return defaultContent();
  }
}

/** อ่านเนื้อหาเว็บ (แคชไว้จนกว่าแอดมินจะกดบันทึก) */
export const getContent = unstable_cache(fetchContentFromBlob, ["site-content"], {
  tags: [CONTENT_TAG],
});

/** อ่านแบบข้ามแคช — ใช้ในหน้าแอดมินที่ต้องเห็นของล่าสุดเสมอ */
export async function getContentFresh(): Promise<SiteContent> {
  return fetchContentFromBlob();
}

export async function saveContent(content: SiteContent): Promise<void> {
  if (!hasBlobStore()) {
    throw new Error(
      "ยังไม่ได้ตั้งค่าที่เก็บข้อมูล — ต้องสร้าง Blob store ใน Vercel ก่อน จึงจะบันทึกได้"
    );
  }

  const payload: SiteContent = { ...content, updatedAt: new Date().toISOString() };

  await put(CONTENT_PATH, JSON.stringify(payload, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  revalidateTag(CONTENT_TAG);
}
