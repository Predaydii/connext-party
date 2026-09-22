import "server-only";
import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { cookies } from "next/headers";

/* ล็อกอินแอดมินแบบรหัสเดียว เก็บ session ใน cookie ที่เซ็นลายเซ็นไว้
   เปลี่ยนรหัสได้โดยตั้ง env ADMIN_PASSWORD ใน Vercel (แนะนำอย่างยิ่ง เพราะ repo นี้เป็น public) */

const SESSION_COOKIE = "connext_admin";
const SESSION_DAYS = 30;

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "27192te";
}

function sessionSecret(): string {
  // ถ้าไม่ตั้ง secret แยก จะอนุมานจากรหัสผ่าน — เปลี่ยนรหัสเมื่อไหร่ session เก่าหลุดทันที
  return process.env.ADMIN_SESSION_SECRET?.trim() || `connext:${adminPassword()}`;
}

function sign(value: string): string {
  return createHmac("sha256", sessionSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyPassword(input: string): boolean {
  return safeEqual(input.trim(), adminPassword());
}

function createToken(): string {
  const expiresAt = Date.now() + SESSION_DAYS * 86_400_000;
  const nonce = randomBytes(8).toString("hex");
  const payload = `${expiresAt}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expiresAt, nonce, signature] = parts;
  if (!safeEqual(signature, sign(`${expiresAt}.${nonce}`))) return false;

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export function isLoggedIn(): boolean {
  return verifyToken(cookies().get(SESSION_COOKIE)?.value);
}

export function startSession(): void {
  cookies().set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export function endSession(): void {
  cookies().delete(SESSION_COOKIE);
}

/** รหัสยังเป็นค่าเริ่มต้นที่อยู่ในซอร์สโค้ดสาธารณะอยู่ไหม — ใช้เตือนในหน้าแอดมิน */
export function isUsingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD?.trim();
}
