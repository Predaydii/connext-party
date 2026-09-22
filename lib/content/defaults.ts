import { leaders as staticLeaders } from "@/lib/data/leaders";
import {
  COMPLETED_POLICIES,
  IN_PROGRESS_POLICIES,
  VISION_IMAGES,
} from "@/lib/data/vision";
import type { PolicyStatus, SiteContent } from "@/lib/content/types";

/* ค่าเริ่มต้น = เนื้อหาเดิมที่ hardcode ไว้ใน lib/data
   ใช้ตอนที่ยังไม่มีใครกดบันทึกในหน้าแอดมิน หรือตอนที่ยังไม่ได้ตั้งค่า Blob store */

function defaultPolicyStatuses(): Record<string, PolicyStatus> {
  const statuses: Record<string, PolicyStatus> = {};
  VISION_IMAGES.forEach((_, i) => {
    const no = i + 1;
    if (COMPLETED_POLICIES.includes(no)) statuses[no] = "done";
    else if (IN_PROGRESS_POLICIES.includes(no)) statuses[no] = "progress";
    else statuses[no] = "none";
  });
  return statuses;
}

export function defaultContent(): SiteContent {
  return {
    welcomeImages: ["/on.png"],
    policyStatuses: defaultPolicyStatuses(),
    leaders: staticLeaders.map((leader, i) => ({
      id: `leader-${i + 1}`,
      name: leader.name,
      position: leader.position,
      image: leader.image,
      experience: [...leader.experience],
      achievements: [...leader.achievements],
    })),
    news: [],
    updatedAt: new Date(0).toISOString(),
  };
}

/* เติมช่องที่ขาดให้ครบเสมอ — กันเคสไฟล์ JSON เก่าที่บันทึกไว้ก่อนเพิ่มฟิลด์ใหม่ */
export function normalizeContent(raw: unknown): SiteContent {
  const base = defaultContent();
  if (!raw || typeof raw !== "object") return base;
  const input = raw as Partial<SiteContent>;

  return {
    welcomeImages: Array.isArray(input.welcomeImages)
      ? input.welcomeImages.filter((s): s is string => typeof s === "string")
      : base.welcomeImages,
    policyStatuses: { ...base.policyStatuses, ...(input.policyStatuses ?? {}) },
    leaders: Array.isArray(input.leaders) && input.leaders.length > 0
      ? input.leaders.map((leader, i) => ({
          id: leader?.id ?? `leader-${i + 1}`,
          name: leader?.name ?? "",
          position: leader?.position ?? "",
          image: leader?.image ?? "",
          experience: Array.isArray(leader?.experience) ? leader.experience : [],
          achievements: Array.isArray(leader?.achievements) ? leader.achievements : [],
        }))
      : base.leaders,
    news: Array.isArray(input.news)
      ? input.news.map((item, i) => ({
          id: item?.id ?? `news-${i + 1}`,
          title: item?.title ?? "",
          date: item?.date ?? "",
          location: item?.location ?? "",
          body: item?.body ?? "",
          images: Array.isArray(item?.images) ? item.images : [],
          createdAt: item?.createdAt ?? new Date(0).toISOString(),
        }))
      : base.news,
    updatedAt: input.updatedAt ?? base.updatedAt,
  };
}
