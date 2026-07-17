"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PolicyStatusBadge from "@/components/PolicyStatusBadge";
import SmartImage from "@/components/SmartImage";
import { COMPLETED_POLICIES, IN_PROGRESS_POLICIES, VISION_IMAGES } from "@/lib/data/vision";

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
      {/* แถบสรุปสถานะนโยบาย — ตัวเลขใหญ่ + คำอธิบาย คั่นด้วยเส้นแนวตั้ง */}
      <div className="mb-12">
        <p className="text-center text-sm tracking-[0.3em] text-gray-400">
          ความคืบหน้านโยบาย
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0">
          {[
            { value: `${VISION_IMAGES.length}`, line1: "นโยบาย", line2: "ทำได้จริง" },
            { value: `${COMPLETED_POLICIES.length}`, line1: "นโยบาย", line2: "ทำแล้ว" },
            { value: `${IN_PROGRESS_POLICIES.length}`, line1: "นโยบาย", line2: "กำลังดำเนินการ" },
          ].map((stat, i) => (
            <div
              key={stat.line2}
              className={`flex items-center gap-3 px-10 sm:px-14 ${
                i > 0 ? "sm:border-l sm:border-gray-200" : ""
              }`}
            >
              <span className="text-5xl font-extrabold text-connext-primary sm:text-6xl">
                {stat.value}
              </span>
              <span className="text-sm leading-snug text-gray-500">
                {stat.line1}
                <br />
                {stat.line2}
              </span>
            </div>
          ))}
        </div>
      </div>

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
            <PolicyStatusBadge no={i + 1} />
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
              <PolicyStatusBadge no={openIndex + 1} large />
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
