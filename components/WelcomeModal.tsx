"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ป๊อปอัปต้อนรับ — โชว์ครั้งเดียวต่อการเปิดเบราว์เซอร์หนึ่งรอบ (sessionStorage)
   เปลี่ยนรูปได้ที่ public/on.png (แนะนำ 4:5) */
export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("welcome-shown")) return;
    // ตั้ง flag ตอนเปิดจริง กัน StrictMode รัน effect ซ้ำแล้ว modal ไม่โผล่
    const timer = setTimeout(() => {
      sessionStorage.setItem("welcome-shown", "1");
      setOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="ประกาศจากพรรคคอนเน็กซ์"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-[4/5] w-[min(90vw,calc(82dvh*4/5))] overflow-hidden rounded-2xl bg-connext-primary shadow-2xl"
          >
            <Image
              src="/on.png"
              alt="ประกาศจากพรรคคอนเน็กซ์"
              fill
              sizes="90vw"
              priority
              className="object-cover"
              onError={() => setOpen(false)}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="ปิด"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white backdrop-blur transition hover:bg-black/80"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
