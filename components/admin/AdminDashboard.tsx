"use client";

import Link from "next/link";
import { useState } from "react";
import { logoutAction } from "@/app/admin/actions";
import type { SiteContent } from "@/lib/content/types";
import WelcomeImagesForm from "@/components/admin/WelcomeImagesForm";
import PolicyStatusForm from "@/components/admin/PolicyStatusForm";
import LeadersForm from "@/components/admin/LeadersForm";
import NewsManager from "@/components/admin/NewsManager";

const TABS = [
  { id: "news", label: "ข่าวกิจกรรม" },
  { id: "welcome", label: "ภาพต้อนรับ" },
  { id: "policies", label: "สถานะนโยบาย" },
  { id: "leaders", label: "ประวัติแกนนำ" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminDashboard({
  content,
  visionImages,
  storageReady,
  usingDefaultPassword,
}: {
  content: SiteContent;
  policyCount: number;
  visionImages: string[];
  storageReady: boolean;
  usingDefaultPassword: boolean;
}) {
  const [tab, setTab] = useState<TabId>("news");

  return (
    <div className="min-h-dvh bg-gray-50">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-base font-extrabold text-connext-primary">
              ผู้ดูแลระบบ · พรรคคอนเน็กซ์
            </h1>
            <p className="truncate text-xs text-gray-500">
              แก้แล้วเว็บอัปเดตทันที ไม่ต้อง deploy ใหม่
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              ดูเว็บ
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                ออกจากระบบ
              </button>
            </form>
          </div>
        </div>

        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === item.id
                  ? "bg-connext-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-5xl space-y-4 px-4 py-6 sm:px-6">
        {!storageReady && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
            <p className="text-sm font-bold text-amber-900">
              ยังบันทึกไม่ได้ — ต้องต่อที่เก็บข้อมูลก่อน
            </p>
            <p className="mt-1 text-sm text-amber-800">
              เข้า Vercel → โปรเจกต์ connext-party → แท็บ <b>Storage</b> → <b>Create Database</b> →
              เลือก <b>Blob</b> → กด Connect เข้าโปรเจกต์ แล้ว redeploy หนึ่งครั้ง
              ระบบจะได้ตัวแปร <code className="rounded bg-amber-100 px-1">BLOB_READ_WRITE_TOKEN</code> เอง
              ระหว่างนี้หน้าเว็บยังแสดงเนื้อหาเดิมได้ตามปกติ
            </p>
          </div>
        )}

        {usingDefaultPassword && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-900">
              รหัสผ่านยังเป็นค่าเริ่มต้นที่อยู่ในโค้ดสาธารณะ
            </p>
            <p className="mt-1 text-sm text-red-800">
              repo นี้เปิดเป็น public ใครก็อ่านรหัสจากโค้ดได้ — ตั้งค่า
              <code className="mx-1 rounded bg-red-100 px-1">ADMIN_PASSWORD</code>
              ใน Vercel → Settings → Environment Variables แล้ว redeploy
              รหัสใหม่จะมีผลทันทีและรหัสในโค้ดจะใช้ไม่ได้อีก
            </p>
          </div>
        )}

        {tab === "news" && <NewsManager news={content.news} />}
        {tab === "welcome" && <WelcomeImagesForm images={content.welcomeImages} />}
        {tab === "policies" && (
          <PolicyStatusForm
            statuses={content.policyStatuses}
            visionImages={visionImages}
          />
        )}
        {tab === "leaders" && <LeadersForm leaders={content.leaders} />}
      </div>
    </div>
  );
}
