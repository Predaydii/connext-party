"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";

type DocumentItem = {
  id: string;
  title: string;
  image: string; // ใส่ path รูปจริงใน public/images/documents แล้วเปลี่ยน placeholder เป็น <Image>
};

const DOCUMENTS: DocumentItem[] = [
  { id: "doc-1", title: "เอกสารแนะนำพรรค 1", image: "/images/abouts/about-1.png" },
  { id: "doc-2", title: "เอกสารแนะนำพรรค 2", image: "/images/abouts/about-2.png" },
];

function A4Placeholder({ title, large }: { title: string; large?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-white to-gray-100">
      <span className="flex aspect-square w-12 items-center justify-center rounded-md bg-connext-primary text-lg font-bold text-white">
        C
      </span>
      <p className={`px-4 text-center font-semibold text-gray-500 ${large ? "text-lg" : "text-sm"}`}>
        {title}
      </p>
    </div>
  );
}

export default function DocumentGallery() {
  const [openDoc, setOpenDoc] = useState<DocumentItem | null>(null);

  // ปิดด้วยปุ่ม Esc และล็อกการ scroll พื้นหลังระหว่างเปิดดู
  useEffect(() => {
    if (!openDoc) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenDoc(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openDoc]);

  return (
    <>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {DOCUMENTS.map((doc) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => setOpenDoc(doc)}
            aria-label={`เปิดดู${doc.title}`}
            className="group relative aspect-[210/297] w-full overflow-hidden rounded-xl border border-gray-200 shadow-md transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-connext-primary/20"
          >
            <A4Placeholder title={doc.title} />
            <SmartImage src={doc.image} alt={doc.title} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
            <span className="absolute inset-0 flex items-center justify-center bg-connext-primary/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-connext-primary/40 group-hover:opacity-100">
              คลิกเพื่อดูเต็มจอ
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenDoc(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={openDoc.title}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[210/297] w-[min(92vw,calc(88dvh*210/297))] overflow-hidden rounded-lg bg-white shadow-2xl"
            >
              <SmartImage src={openDoc.image} alt={openDoc.title} sizes="92vw" />
              <button
                type="button"
                onClick={() => setOpenDoc(null)}
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
