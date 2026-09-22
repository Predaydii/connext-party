/* แปลงวันที่ ISO (YYYY-MM-DD) เป็นรูปแบบไทย พ.ศ. เช่น "10 กรกฎาคม 2569"
   ใช้ร่วมกันทั้งหน้าเว็บและหน้าแอดมิน */

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

export function formatThaiDate(iso: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${THAI_MONTHS[month - 1] ?? ""} ${year + 543}`.trim();
}

/** เรียงข่าวใหม่ก่อน — วันที่เท่ากันใช้เวลาที่สร้างตัดสิน */
export function sortNewsByDate<T extends { date: string; createdAt: string }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    return byDate !== 0 ? byDate : b.createdAt.localeCompare(a.createdAt);
  });
}
