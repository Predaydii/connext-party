import type { Metadata } from "next";
import { isLoggedIn, isUsingDefaultPassword } from "@/lib/auth";
import { getContentFresh, hasBlobStore } from "@/lib/content/store";
import { VISION_IMAGES } from "@/lib/data/vision";
import LoginForm from "@/components/admin/LoginForm";
import AdminDashboard from "@/components/admin/AdminDashboard";

// หน้าแอดมินต้องอ่านของสดเสมอ ห้าม prerender
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ผู้ดูแลระบบ",
  // กันไม่ให้หน้าแอดมินไปโผล่ในผลค้นหา
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminPage() {
  if (!isLoggedIn()) return <LoginForm />;

  const content = await getContentFresh();

  return (
    <AdminDashboard
      content={content}
      policyCount={VISION_IMAGES.length}
      visionImages={VISION_IMAGES}
      storageReady={hasBlobStore()}
      usingDefaultPassword={isUsingDefaultPassword()}
    />
  );
}
