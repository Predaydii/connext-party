"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { useState } from "react";
import { saveLeaderAction, type ActionState } from "@/app/admin/actions";
import type { LeaderContent } from "@/lib/content/types";
import {
  Card,
  FileInput,
  Label,
  Notice,
  SaveButton,
  inputClass,
} from "@/components/admin/ui";

function LeaderEditor({ leader }: { leader: LeaderContent }) {
  const [state, formAction] = useFormState<ActionState, FormData>(
    saveLeaderAction,
    null
  );

  return (
    <form action={formAction} className="rounded-xl border border-gray-200 p-4">
      <input type="hidden" name="id" value={leader.id} />

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="sm:w-48 sm:shrink-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-b from-connext-secondary to-connext-light">
            {leader.image && (
              <Image
                src={leader.image}
                alt={leader.name}
                fill
                sizes="200px"
                className="object-cover"
              />
            )}
          </div>
          <FileInput name="photo" label="เปลี่ยนรูป" />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <Label>ชื่อ-นามสกุล</Label>
            <input
              name="name"
              defaultValue={leader.name}
              className={inputClass}
            />
          </div>
          <div>
            <Label>ตำแหน่ง</Label>
            <input
              name="position"
              defaultValue={leader.position}
              className={inputClass}
            />
          </div>
          <div>
            <Label hint="1 บรรทัด = 1 ข้อ">ประสบการณ์การทำงาน</Label>
            <textarea
              name="experience"
              rows={5}
              defaultValue={leader.experience.join("\n")}
              className={inputClass}
            />
          </div>
          <div>
            <Label hint="1 บรรทัด = 1 ข้อ">รางวัลและความสำเร็จ</Label>
            <textarea
              name="achievements"
              rows={5}
              defaultValue={leader.achievements.join("\n")}
              className={inputClass}
            />
          </div>

          <SaveButton />
          <Notice state={state} />
        </div>
      </div>
    </form>
  );
}

export default function LeadersForm({ leaders }: { leaders: LeaderContent[] }) {
  const [openId, setOpenId] = useState<string | null>(leaders[0]?.id ?? null);

  return (
    <Card
      title="ประวัติแกนนำ"
      description="กดชื่อเพื่อเปิดแก้ไข — แต่ละคนกดบันทึกแยกกัน"
    >
      <div className="space-y-3">
        {leaders.map((leader) => {
          const open = openId === leader.id;
          return (
            <div key={leader.id}>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : leader.id)}
                className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-left transition hover:bg-connext-light/10"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-gray-800">
                    {leader.name || "(ยังไม่ได้ตั้งชื่อ)"}
                  </span>
                  <span className="block truncate text-xs text-gray-500">
                    {leader.position}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`ml-3 shrink-0 text-connext-primary transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
              {open && (
                <div className="mt-2">
                  <LeaderEditor leader={leader} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
