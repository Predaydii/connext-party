"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { useState } from "react";
import {
  addLeaderAction,
  deleteLeaderAction,
  moveLeaderAction,
  saveLeaderAction,
  type ActionState,
} from "@/app/admin/actions";
import type { LeaderContent } from "@/lib/content/types";
import {
  Card,
  DangerButton,
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

function DeleteLeaderForm({ id, name }: { id: string; name: string }) {
  const [state, formAction] = useFormState<ActionState, FormData>(
    deleteLeaderAction,
    null
  );
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm(`ลบ "${name}" ออกจากหน้าประวัติแกนนำถาวร แน่ใจหรือไม่?`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <DangerButton>ลบแกนนำคนนี้</DangerButton>
      <Notice state={state} />
    </form>
  );
}

function MoveLeaderForm({
  id,
  direction,
  disabled,
}: {
  id: string;
  direction: "up" | "down";
  disabled: boolean;
}) {
  const [, formAction] = useFormState<ActionState, FormData>(moveLeaderAction, null);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="direction" value={direction} />
      <button
        type="submit"
        disabled={disabled}
        aria-label={direction === "up" ? "เลื่อนขึ้น" : "เลื่อนลง"}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-sm font-bold text-gray-600 transition hover:bg-white disabled:opacity-30"
      >
        {direction === "up" ? "↑" : "↓"}
      </button>
    </form>
  );
}

function AddLeaderForm() {
  const [state, formAction] = useFormState<ActionState, FormData>(
    () => addLeaderAction(),
    null
  );
  return (
    <form action={formAction}>
      <button
        type="submit"
        className="rounded-full bg-connext-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-connext-secondary"
      >
        + เพิ่มแกนนำ
      </button>
      <Notice state={state} />
    </form>
  );
}

export default function LeadersForm({ leaders }: { leaders: LeaderContent[] }) {
  const [openId, setOpenId] = useState<string | null>(leaders[0]?.id ?? null);

  return (
    <Card
      title="ประวัติแกนนำ"
      description="กดชื่อเพื่อเปิดแก้ไข — แต่ละคนกดบันทึกแยกกัน ลำดับในนี้คือลำดับที่แสดงบนเว็บ"
    >
      <div className="mb-5">
        <AddLeaderForm />
      </div>

      <div className="space-y-3">
        {leaders.map((leader, i) => {
          const open = openId === leader.id;
          return (
            <div key={leader.id}>
              <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
                <div className="flex shrink-0 flex-col gap-1">
                  <MoveLeaderForm id={leader.id} direction="up" disabled={i === 0} />
                  <MoveLeaderForm
                    id={leader.id}
                    direction="down"
                    disabled={i === leaders.length - 1}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : leader.id)}
                  className="flex min-w-0 flex-1 items-center justify-between text-left"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-gray-800">
                      {i + 1}. {leader.name || "(ยังไม่ได้ตั้งชื่อ)"}
                    </span>
                    <span className="block truncate text-xs text-gray-500">
                      {leader.position || "(ยังไม่ได้ใส่ตำแหน่ง)"}
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
              </div>

              {open && (
                <div className="mt-2 space-y-3">
                  <LeaderEditor leader={leader} />
                  <DeleteLeaderForm id={leader.id} name={leader.name} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
