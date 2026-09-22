"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { useState } from "react";
import {
  deleteNewsAction,
  saveNewsAction,
  type ActionState,
} from "@/app/admin/actions";
import type { NewsItem } from "@/lib/content/types";
import { formatThaiDate } from "@/lib/format";
import {
  Card,
  DangerButton,
  FileInput,
  Label,
  Notice,
  ReorderButtons,
  SaveButton,
  inputClass,
  moveItem,
} from "@/components/admin/ui";

function NewsForm({
  item,
  onDone,
}: {
  item?: NewsItem;
  onDone?: () => void;
}) {
  const [state, formAction] = useFormState<ActionState, FormData>(
    saveNewsAction,
    null
  );
  const [kept, setKept] = useState<string[]>(item?.images ?? []);

  return (
    <form action={formAction} className="rounded-xl border border-gray-200 p-4">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="space-y-3">
        <div>
          <Label>หัวข้อข่าว</Label>
          <input
            name="title"
            required
            defaultValue={item?.title}
            placeholder="เช่น กิจกรรมแนะแนวโรงเรียนในเขตพื้นที่บริการ"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label hint="ปี ค.ศ.">วันที่</Label>
            <input
              name="date"
              type="date"
              required
              defaultValue={item?.date}
              className={inputClass}
            />
          </div>
          <div>
            <Label>สถานที่</Label>
            <input
              name="location"
              defaultValue={item?.location}
              placeholder="เช่น หอประชุมโรงเรียนตราษตระการคุณ"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <Label hint="เว้นบรรทัด = ย่อหน้าใหม่">รายละเอียดข่าว</Label>
          <textarea
            name="body"
            rows={7}
            defaultValue={item?.body}
            className={inputClass}
          />
        </div>

        <div>
          <Label hint="ภาพแรกใช้เป็นภาพหน้าปก">รูปภาพ</Label>
          {kept.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {kept.map((src, i) => (
                <div key={src} className="relative">
                  <input type="hidden" name="keep" value={src} />
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                    <ReorderButtons
                      index={i}
                      total={kept.length}
                      onMove={(from, to) => setKept((prev) => moveItem(prev, from, to))}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setKept((prev) => prev.filter((s) => s !== src))}
                    aria-label="เอารูปนี้ออก"
                    className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <FileInput name="images" multiple label="เพิ่มรูป (เลือกได้หลายไฟล์)" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SaveButton>{item ? "บันทึกการแก้ไข" : "เผยแพร่ข่าว"}</SaveButton>
          {onDone && (
            <button
              type="button"
              onClick={onDone}
              className="text-sm font-semibold text-gray-500 hover:text-gray-700"
            >
              ยกเลิก
            </button>
          )}
        </div>
        <Notice state={state} />
      </div>
    </form>
  );
}

function DeleteForm({ id }: { id: string }) {
  const [state, formAction] = useFormState<ActionState, FormData>(
    deleteNewsAction,
    null
  );
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("ลบข่าวนี้ถาวร แน่ใจหรือไม่?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <DangerButton>ลบ</DangerButton>
      <Notice state={state} />
    </form>
  );
}

export default function NewsManager({ news }: { news: NewsItem[] }) {
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <Card
      title="ข่าวกิจกรรม"
      description={`ตอนนี้มี ${news.length} ข่าว — ข่าวใหม่จะขึ้นก่อนตามวันที่`}
    >
      {creating ? (
        <div className="mb-5">
          <NewsForm onDone={() => setCreating(false)} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="mb-5 rounded-full bg-connext-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-connext-secondary"
        >
          + เขียนข่าวใหม่
        </button>
      )}

      {news.length === 0 ? (
        <p className="rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
          ยังไม่มีข่าว — กด &ldquo;เขียนข่าวใหม่&rdquo; เพื่อเริ่มต้น
        </p>
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <div key={item.id}>
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                  {item.images[0] && (
                    <Image
                      src={item.images[0]}
                      alt=""
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-800">
                    {item.title}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {formatThaiDate(item.date)}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingId(editingId === item.id ? null : item.id)
                    }
                    className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-white"
                  >
                    {editingId === item.id ? "ปิด" : "แก้ไข"}
                  </button>
                  <DeleteForm id={item.id} />
                </div>
              </div>
              {editingId === item.id && (
                <div className="mt-2">
                  <NewsForm item={item} onDone={() => setEditingId(null)} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
