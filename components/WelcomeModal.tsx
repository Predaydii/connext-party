"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ป๊อปอัปต้อนรับ — โชว์ครั้งเดียวต่อการเปิดเบราว์เซอร์หนึ่งรอบ (sessionStorage)
   ภาพมาจากหน้าแอดมิน ใส่ได้หลายภาพ ถ้ามากกว่า 1 จะเลื่อนดูได้ */
export default function WelcomeModal({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    if (sessionStorage.getItem("welcome-shown")) return;
    // ตั้ง flag ตอนเปิดจริง กัน StrictMode รัน effect ซ้ำแล้ว modal ไม่โผล่
    const timer = setTimeout(() => {
      sessionStorage.setItem("welcome-shown", "1");
      setOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, images.length]);

  if (images.length === 0) return null;
  const multiple = images.length > 1;

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
            <AnimatePresence mode="wait">
              <motion.div
                key={images[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[index]}
                  alt="ประกาศจากพรรคคอนเน็กซ์"
                  fill
                  sizes="90vw"
                  priority
                  className="object-cover"
                  onError={() => setOpen(false)}
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="ปิด"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white backdrop-blur transition hover:bg-black/80"
            >
              ✕
            </button>

            {multiple && (
              <>
                <button
                  type="button"
                  aria-label="ภาพก่อนหน้า"
                  onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-xl text-white backdrop-blur transition hover:bg-black/70"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="ภาพถัดไป"
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-xl text-white backdrop-blur transition hover:bg-black/70"
                >
                  →
                </button>
                <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      aria-label={`ดูภาพที่ ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
