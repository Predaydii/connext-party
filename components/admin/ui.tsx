"use client";

import { useFormStatus } from "react-dom";
import type { ActionState } from "@/app/admin/actions";

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

/** ช่องเลือกไฟล์รูป — โชว์ชื่อไฟล์ที่เลือกไว้ให้เห็นชัด */
export function FileInput({
  name,
  multiple = false,
  label,
}: {
  name: string;
  multiple?: boolean;
  label: string;
}) {
  return (
    <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-center transition hover:border-connext-secondary hover:bg-connext-light/5">
      <span className="text-2xl" aria-hidden>
        📷
      </span>
      <span className="text-sm font-semibold text-connext-primary">{label}</span>
      <span className="text-xs text-gray-400">PNG, JPG, WebP — ไม่เกิน 4MB ต่อไฟล์</span>
      <input
        type="file"
        name={name}
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          const list = e.currentTarget.files;
          const target = e.currentTarget.parentElement?.querySelector("[data-file-names]");
          if (target) {
            target.textContent = list?.length
              ? Array.from(list).map((f) => f.name).join(", ")
              : "";
          }
        }}
      />
      <span data-file-names className="text-xs font-medium text-green-700" />
    </label>
  );
}
