// รูปวิสัยทัศน์/นโยบาย 4:5 (1080x1350) — ใช้ร่วมกันทั้งการ์ดหน้าหลักและหน้านโยบายพรรค
export const VISION_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/images/vision/vision-${i + 1}.png`
);

// ลำดับนโยบายที่ทำสำเร็จแล้ว (เลขตามชื่อไฟล์ vision-X) — เพิ่มเลขต่อท้ายได้เลย เช่น [5, 7]
export const COMPLETED_POLICIES = [2, 3, 5];

// ลำดับนโยบายที่อยู่ระหว่างดำเนินการ — ย้ายเลขไป COMPLETED_POLICIES เมื่อทำสำเร็จ
export const IN_PROGRESS_POLICIES = [1, 4, 6, 7, 8, 9, 10];
