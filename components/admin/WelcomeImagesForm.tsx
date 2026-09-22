"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { useState } from "react";
import { saveWelcomeImagesAction, type ActionState } from "@/app/admin/actions";
import { Card, FileInput, Notice, SaveButton } from "@/components/admin/ui";

export default function WelcomeImagesForm({ images }: { images: string[] }) {
  const [state, formAction] = useFormState<ActionState, FormData>(
    saveWelcomeImagesAction,
    null
  );
  // ติ๊กออก = ลบภาพนั้นตอนกดบันทึก (ยังไม่ลบจนกว่าจะกด)
  const [kept, setKept] = useState<string[]>(images);

  const toggle = (src: string) =>
    setKept((prev) =>
      prev.includes(src) ? prev.filter((s) => s !== src) : [...prev, src]
    );

  return (
    <Card
      title="ภาพต้อนรับตอนเปิดเว็บ"
      description="ป๊อปอัปที่เด้งขึ้นมาตอนเข้าเว็บครั้งแรก ใส่ได้หลายภาพ — ถ้าใส่มากกว่า 1 ภาพจะเลื่อนดูได้ / ถ้าไม่เหลือภาพเลยป๊อปอัปจะไม่เด้ง"
    >
      <form action={formAction}>
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((src) => {
              const active = kept.includes(src);
              return (
                <label
                  key={src}
                  className={`relative block cursor-pointer overflow-hidden rounded-xl border-2 transition ${
                    active ? "border-connext-secondary" : "border-gray-200 opacity-40"
                  }`}
                >
                  <span className="relative block aspect-[4/5] bg-gray-100">
                    <Image
                      src={src}
                      alt="ภาพต้อนรับ"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </span>
                  <input
                    type="checkbox"
                    name="keep"
                    value={src}
                    checked={active}
                    onChange={() => toggle(src)}
                    className="absolute left-2 top-2 h-5 w-5 accent-connext-primary"
                  />
                  {!active && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-bold text-white">
                      จะถูกลบ
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        )}

        <FileInput name="images" multiple label="เพิ่มภาพใหม่ (เลือกได้หลายไฟล์)" />

        <div className="mt-4">
          <SaveButton />
        </div>
        <Notice state={state} />
      </form>
    </Card>
  );
}
