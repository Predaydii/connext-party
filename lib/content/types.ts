/* โครงข้อมูลทั้งหมดที่แอดมินแก้ได้ — เก็บเป็น JSON ก้อนเดียวบน Vercel Blob
   ถ้ายังไม่ได้ตั้งค่า Blob ระบบจะใช้ค่าเริ่มต้นใน defaults.ts แทน เว็บจึงไม่มีทางพัง */

export type NewsItem = {
  id: string;
  title: string;
  /** วันที่จัดกิจกรรม รูปแบบ YYYY-MM-DD (ค.ศ.) */
  date: string;
  location: string;
  /** รายละเอียดข่าว — ขึ้นบรรทัดใหม่ = ย่อหน้าใหม่ */
  body: string;
  images: string[];
  createdAt: string;
};

export type LeaderContent = {
  id: string;
  name: string;
  position: string;
  image: string;
  experience: string[];
  achievements: string[];
};

/** สถานะนโยบายต่อ 1 รูป (เลขตามชื่อไฟล์ vision-X) */
export type PolicyStatus = "done" | "progress" | "none";

export type SiteContent = {
  /** ภาพป๊อปอัปตอนเปิดเว็บ — ใส่ได้หลายภาพ, ว่าง = ไม่เด้งป๊อปอัป */
  welcomeImages: string[];
  /** map เลขนโยบาย -> สถานะ */
  policyStatuses: Record<string, PolicyStatus>;
  leaders: LeaderContent[];
  news: NewsItem[];
  updatedAt: string;
};
