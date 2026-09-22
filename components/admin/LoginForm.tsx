"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type ActionState } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 w-full rounded-full bg-connext-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-connext-secondary disabled:opacity-60"
    >
      {pending ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState<ActionState, FormData>(loginAction, null);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-connext-primary via-connext-secondary to-connext-light px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl"
      >
        <h1 className="text-xl font-extrabold text-connext-primary">
          ผู้ดูแลระบบ
        </h1>
        <p className="mt-1 text-sm text-gray-500">พรรคคอนเน็กซ์ Connext Party</p>

        <label
          htmlFor="password"
          className="mt-6 block text-sm font-semibold text-gray-700"
        >
          รหัสผ่าน
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-connext-secondary focus:ring-2 focus:ring-connext-light/40"
        />

        {state && !state.ok && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {state.message}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
