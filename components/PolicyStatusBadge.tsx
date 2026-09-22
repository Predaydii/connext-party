import type { PolicyStatus } from "@/lib/content/types";

/* ป้ายสถานะนโยบาย — สถานะมาจากหน้าแอดมิน
   ทำแล้ว = เขียวพร้อมวงแหวนเรือง / กำลังดำเนินการ = เหลืองพร้อมจุดกะพริบ */
export default function PolicyStatusBadge({
  status,
  large = false,
}: {
  status: PolicyStatus;
  large?: boolean;
}) {
  const sizeClass = large ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs";

  if (status === "done") {
    return (
      <span
        className={`badge-done absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-green-500 font-bold text-white shadow-lg ${sizeClass}`}
      >
        <svg
          viewBox="0 0 20 20"
          className={`fill-current ${large ? "h-4 w-4" : "h-3.5 w-3.5"}`}
          aria-hidden
        >
          <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" />
        </svg>
        ทำแล้ว
      </span>
    );
  }

  if (status === "progress") {
    return (
      <span
        className={`absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-amber-400 font-bold text-amber-950 shadow-lg ${sizeClass}`}
      >
        <span
          aria-hidden
          className={`badge-progress-dot rounded-full bg-amber-800 ${large ? "h-2.5 w-2.5" : "h-2 w-2"}`}
        />
        กำลังดำเนินการ
      </span>
    );
  }

  return null;
}
