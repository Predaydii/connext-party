"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { savePolicyStatusesAction, type ActionState } from "@/app/admin/actions";
import type { PolicyStatus } from "@/lib/content/types";
import { Card, Notice, SaveButton } from "@/components/admin/ui";

const OPTIONS: { value: PolicyStatus; label: string; className: string }[] = [
  { value: "done", label: "ทำแล้ว", className: "peer-checked:bg-green-500 peer-checked:text-white" },
  { value: "progress", label: "กำลังทำ", className: "peer-checked:bg-amber-400 peer-checked:text-amber-950" },
  { value: "none", label: "ไม่แสดงป้าย", className: "peer-checked:bg-gray-500 peer-checked:text-white" },
];

export default function PolicyStatusForm({
  statuses,
  visionImages,
}: {
  statuses: Record<string, PolicyStatus>;
  visionImages: string[];
}) {
  const [state, formAction] = useFormState<ActionState, FormData>(
    savePolicyStatusesAction,
    null
  );

  return (
    <Card
      title="สถานะนโยบาย"
      description="ป้ายที่แสดงบนรูปนโยบาย ทั้งหน้าหลักและหน้านโยบายพรรค"
    >
      <form action={formAction}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visionImages.map((src, i) => {
            const no = String(i + 1);
            const current = statuses[no] ?? "progress";
            return (
              <div
                key={src}
                className="flex gap-3 rounded-xl border border-gray-200 p-3"
              >
                <div className="relative h-24 w-[77px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={src}
                    alt={`นโยบายที่ ${no}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-800">นโยบายที่ {no}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {OPTIONS.map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name={`policy-${no}`}
                          value={option.value}
                          defaultChecked={current === option.value}
                          className="peer sr-only"
                        />
                        <span
                          className={`inline-block rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-600 transition peer-checked:border-transparent ${option.className}`}
                        >
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          <SaveButton />
        </div>
        <Notice state={state} />
      </form>
    </Card>
  );
}
