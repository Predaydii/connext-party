"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import type { ActionState } from "@/app/admin/actions";
import { compressAll, formatBytes } from "@/lib/image-compress";

export function SaveButton({ children = "บันทึก" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-connext-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-connext-secondary disabled:opacity-60"
    >
      {pending ? "กำลังบันทึก..." : children}
    </button>
  );
}

export function DangerButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
    >
      {pending ? "กำลังลบ..." : children}
    </button>
  );
}

export function Notice({ state }: { state: ActionState }) {
  if (!state) return null;
  return (
    <p
      className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${
        state.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
      }`}
    >
      {state.message}
    </p>
  );
}

export function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-sm font-semibold text-gray-700">{children}</span>
      {hint && <span className="ml-2 text-xs text-gray-400">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-connext-secondary focus:ring-2 focus:ring-connext-light/40";

/** ปุ่มเลื่อนลำดับรูป ซ้าย/ขวา — ลำดับมีผลจริง เพราะรูปแรกคือภาพหน้าปก */
export function ReorderButtons({
  index,
  total,
  onMove,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
}) {
  if (total < 2) return null;
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/55 px-1 py-0.5">
      <button
        type="button"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        aria-label="เลื่อนไปทางซ้าย"
        className="px-1.5 text-sm font-bold text-white disabled:opacity-25"
      >
        ←
      </button>
      <span className="text-[11px] font-bold text-white">
        {index === 0 ? "ปก" : index + 1}
      </span>
      <button
        type="button"
        disabled={index === total - 1}
        onClick={() => onMove(index, index + 1)}
        aria-label="เลื่อนไปทางขวา"
        className="px-1.5 text-sm font-bold text-white disabled:opacity-25"
      >
        →
      </button>
    </div>
  );
}

/** ย้ายสมาชิกในอาร์เรย์จากตำแหน่งหนึ่งไปอีกตำแหน่ง */
export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

export function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-extrabold text-connext-primary">{title}</h2>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** ช่องเลือกไฟล์รูป — ย่อรูปอัตโนมัติในเครื่องก่อนอัป เพื่อให้รูปจากมือถือผ่านลิมิต 4MB */
export function FileInput({
  name,
  multiple = false,
  label,
}: {
  name: string;
  multiple?: boolean;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string>("");
  const [working, setWorking] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.currentTarget.files ?? []);
    if (picked.length === 0) {
      setStatus("");
      return;
    }

    setWorking(true);
    setStatus("กำลังย่อรูป...");

    const before = picked.reduce((sum, f) => sum + f.size, 0);
    const compressed = await compressAll(picked);
    const after = compressed.reduce((sum, f) => sum + f.size, 0);

    // ใส่ไฟล์ที่ย่อแล้วกลับเข้า input เพื่อให้ฟอร์มส่งไฟล์เวอร์ชันเล็กขึ้นไป
    const transfer = new DataTransfer();
    compressed.forEach((file) => transfer.items.add(file));
    if (inputRef.current) inputRef.current.files = transfer.files;

    const names = compressed.map((f) => f.name).join(", ");
    setStatus(
      after < before
        ? `${names} · ย่อจาก ${formatBytes(before)} เหลือ ${formatBytes(after)}`
        : `${names} · ${formatBytes(after)}`
    );
    setWorking(false);
  }

  return (
    <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-center transition hover:border-connext-secondary hover:bg-connext-light/5">
      <span className="text-2xl" aria-hidden>
        📷
      </span>
      <span className="text-sm font-semibold text-connext-primary">{label}</span>
      <span className="text-xs text-gray-400">
        PNG, JPG, WebP — ระบบย่อรูปให้อัตโนมัติ อัปจากมือถือได้เลย
      </span>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple={multiple}
        className="sr-only"
        onChange={onChange}
      />
      {status && (
        <span
          className={`text-xs font-medium ${working ? "text-gray-500" : "text-green-700"}`}
        >
          {status}
        </span>
      )}
    </label>
  );
}
