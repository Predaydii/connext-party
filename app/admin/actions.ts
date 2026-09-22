"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  endSession,
  isLoggedIn,
  startSession,
  verifyPassword,
} from "@/lib/auth";
import { getContentFresh, saveContent } from "@/lib/content/store";
import type { LeaderContent, NewsItem, PolicyStatus } from "@/lib/content/types";

export type ActionState = { ok: boolean; message: string } | null;

const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // Server Action รับ body ได้สูงสุด ~4.5MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

function requireAuth(): void {
  if (!isLoggedIn()) throw new Error("กรุณาเข้าสู่ระบบก่อน");
}

/** แตก textarea เป็นรายการ — 1 บรรทัด = 1 ข้อ, ตัดบรรทัดว่างทิ้ง */
function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** อัปโหลดรูปขึ้น Vercel Blob แล้วคืน URL สาธารณะ */
async function uploadImage(file: File, folder: string): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`ไฟล์ ${file.name} ไม่ใช่รูปภาพ (รองรับ PNG, JPG, WebP, GIF)`);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `ไฟล์ ${file.name} ใหญ่เกิน 4MB (${(file.size / 1024 / 1024).toFixed(1)}MB) — ย่อรูปก่อนอัปโหลด`
    );
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const blob = await put(`${folder}/${Date.now()}-${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

async function uploadMany(files: File[], folder: string): Promise<string[]> {
  const real = files.filter((f) => f && f.size > 0);
  if (real.length === 0) return [];
  return Promise.all(real.map((file) => uploadImage(file, folder)));
}

/** รีเฟรชทุกหน้าที่แสดงเนื้อหาที่แอดมินแก้ได้ */
function refreshSite(): void {
  revalidatePath("/", "layout");
}

// ---------------------------------------------------------------- เข้า/ออกระบบ

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return { ok: false, message: "รหัสผ่านไม่ถูกต้อง" };
  }
  startSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  endSession();
  redirect("/admin");
}

// ------------------------------------------------------------ ภาพป๊อปอัปต้อนรับ

export async function saveWelcomeImagesAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    requireAuth();
    const content = await getContentFresh();

    const kept = formData.getAll("keep").map(String);
    const uploaded = await uploadMany(
      formData.getAll("images") as File[],
      "welcome"
    );

    await saveContent({ ...content, welcomeImages: [...kept, ...uploaded] });
    refreshSite();

    const total = kept.length + uploaded.length;
    return {
      ok: true,
      message: total === 0
        ? "บันทึกแล้ว — ตอนนี้ไม่มีป๊อปอัปตอนเปิดเว็บ"
        : `บันทึกแล้ว — ป๊อปอัปมี ${total} ภาพ`,
    };
  } catch (error) {
    return { ok: false, message: (error as Error).message };
  }
}

// ---------------------------------------------------------------- สถานะนโยบาย

export async function savePolicyStatusesAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    requireAuth();
    const content = await getContentFresh();

    const statuses: Record<string, PolicyStatus> = {};
    for (const [key, value] of formData.entries()) {
      if (!key.startsWith("policy-")) continue;
      const no = key.slice("policy-".length);
      const status = String(value);
      if (status === "done" || status === "progress" || status === "none") {
        statuses[no] = status;
      }
    }

    await saveContent({ ...content, policyStatuses: statuses });
    refreshSite();
    return { ok: true, message: "อัปเดตสถานะนโยบายแล้ว" };
  } catch (error) {
    return { ok: false, message: (error as Error).message };
  }
}

// --------------------------------------------------------------- ประวัติแกนนำ

export async function saveLeaderAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    requireAuth();
    const content = await getContentFresh();

    const id = String(formData.get("id") ?? "");
    const index = content.leaders.findIndex((leader) => leader.id === id);
    if (index === -1) return { ok: false, message: "ไม่พบแกนนำคนนี้" };

    const [photo] = await uploadMany(
      [formData.get("photo") as File].filter(Boolean) as File[],
      "leaders"
    );

    const updated: LeaderContent = {
      ...content.leaders[index],
      name: String(formData.get("name") ?? "").trim(),
      position: String(formData.get("position") ?? "").trim(),
      image: photo ?? content.leaders[index].image,
      experience: linesToList(String(formData.get("experience") ?? "")),
      achievements: linesToList(String(formData.get("achievements") ?? "")),
    };

    const leaders = [...content.leaders];
    leaders[index] = updated;

    await saveContent({ ...content, leaders });
    refreshSite();
    return { ok: true, message: `บันทึกประวัติ ${updated.name || "แกนนำ"} แล้ว` };
  } catch (error) {
    return { ok: false, message: (error as Error).message };
  }
}

// --------------------------------------------------------------- ข่าวกิจกรรม

export async function saveNewsAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    requireAuth();
    const content = await getContentFresh();

    const id = String(formData.get("id") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const date = String(formData.get("date") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const body = String(formData.get("body") ?? "").trim();

    if (!title) return { ok: false, message: "กรุณาใส่หัวข้อข่าว" };
    if (!date) return { ok: false, message: "กรุณาเลือกวันที่" };

    const kept = formData.getAll("keep").map(String);
    const uploaded = await uploadMany(formData.getAll("images") as File[], "news");
    const images = [...kept, ...uploaded];

    let news: NewsItem[];
    if (id) {
      const index = content.news.findIndex((item) => item.id === id);
      if (index === -1) return { ok: false, message: "ไม่พบข่าวนี้" };
      news = [...content.news];
      news[index] = { ...news[index], title, date, location, body, images };
    } else {
      const item: NewsItem = {
        id: `news-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title,
        date,
        location,
        body,
        images,
        createdAt: new Date().toISOString(),
      };
      news = [item, ...content.news];
    }

    await saveContent({ ...content, news });
    refreshSite();
    return { ok: true, message: id ? "แก้ไขข่าวแล้ว" : "เพิ่มข่าวใหม่แล้ว" };
  } catch (error) {
    return { ok: false, message: (error as Error).message };
  }
}

export async function deleteNewsAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    requireAuth();
    const content = await getContentFresh();
    const id = String(formData.get("id") ?? "");

    await saveContent({
      ...content,
      news: content.news.filter((item) => item.id !== id),
    });
    refreshSite();
    return { ok: true, message: "ลบข่าวแล้ว" };
  } catch (error) {
    return { ok: false, message: (error as Error).message };
  }
}
