"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";
import { COMPLETED_POLICIES, VISION_IMAGES } from "@/lib/data/vision";

const PLACEHOLDER_CLASSES = [
  "from-connext-primary to-connext-secondary",
  "from-connext-secondary to-connext-light",
  "from-connext-light to-connext-secondary",
  "from-blue-900 to-connext-secondary",
];

export default function PolicyGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ปิดด้วย Esc และล็อก scroll ระหว่างเปิดดู
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {VISION_IMAGES.map((image, i) => (
          <button
            key={image}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`เปิดดูนโยบายรูปที่ ${i + 1}`}
            className={`group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
              PLACEHOLDER_CLASSES[i % PLACEHOLDER_CLASSES.length]
            }`}
          >
            <SmartImage
              src={image}
              alt={`นโยบายพรรคคอนเน็กซ์ ${i + 1}`}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-connext-primary/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-connext-primary/40 group-hover:opacity-100">
              คลิกเพื่อดูเต็มจอ
            </span>
            {/* ป้ายนโยบายที่ทำสำเร็จแล้ว */}
            {COMPLETED_POLICIES.includes(i + 1) && (
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-green-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden>
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" />
                </svg>
                ทำแล้ว
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`นโยบายรูปที่ ${openIndex + 1}`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[4/5] w-[min(92vw,calc(85dvh*4/5))] overflow-hidden rounded-lg bg-white shadow-2xl"
            >
              <SmartImage
                src={VISION_IMAGES[openIndex]}
                alt={`นโยบายพรรคคอนเน็กซ์ ${openIndex + 1}`}
                sizes="92vw"
              />
              {COMPLETED_POLICIES.includes(openIndex + 1) && (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" />
                  </svg>
                  ทำแล้ว
                </span>
              )}
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="ปิด"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white backdrop-blur transition hover:bg-black/80"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
