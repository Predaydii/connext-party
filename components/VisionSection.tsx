"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";
import { VISION_IMAGES } from "@/lib/data/vision";

const PLACEHOLDER_CLASSES = [
  "from-connext-primary to-connext-secondary",
  "from-connext-secondary to-connext-light",
  "from-connext-light to-connext-secondary",
  "from-blue-900 to-connext-secondary",
];

export default function VisionSection() {
  const [current, setCurrent] = useState(0);

  // สไลด์รูปอัตโนมัติทุก 3.5 วินาที
  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((i) => (i + 1) % VISION_IMAGES.length),
      3500
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-connext-primary sm:text-4xl">วิสัยทัศน์</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            ผู้นำพลังใหม่ สร้างสรรค์สิ่งดี สานต่อวัฒนธรรม ก้าวไกลด้วยเทคโนโลยีดิจิทัล
            สู่วัฒนธรรมองค์กรยั่งยืน
          </p>
          <Link
            href="/leaders"
            className="glow-button group mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-connext-primary-contrast shadow-lg shadow-connext-primary/30 transition duration-300 hover:scale-110 hover:shadow-xl hover:shadow-connext-secondary/50 active:scale-95"
          >
            ประวัติแกนนำ
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>

        <h2 className="mt-14 text-center text-3xl font-extrabold text-connext-primary sm:mt-20 sm:text-4xl">
          นโยบายพรรค
        </h2>

        {/* มือถือ: การ์ดเดียวสไลด์วน / คอม: 3 การ์ดสลับรูปกันไปเรื่อย ๆ (ขนาดเท่าการ์ดทำไมต้องคอนเน็กซ์) */}
        <div className="mx-auto mt-10 w-full max-w-xs sm:mt-14 sm:grid sm:max-w-none sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {[0, 1, 2].map((cardOffset) => {
            const imageIndex = (current + cardOffset) % VISION_IMAGES.length;
            return (
              <div
                key={cardOffset}
                className={`relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl ${
                  cardOffset > 0 ? "hidden sm:block" : ""
                }`}
              >
                <AnimatePresence>
                  <motion.div
                    key={imageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`absolute inset-0 bg-gradient-to-br ${
                      PLACEHOLDER_CLASSES[imageIndex % PLACEHOLDER_CLASSES.length]
                    }`}
                  >
                    <SmartImage
                      src={VISION_IMAGES[imageIndex]}
                      alt={`วิสัยทัศน์พรรคคอนเน็กซ์ ${imageIndex + 1}`}
                      sizes="(min-width: 640px) 300px, 320px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* จุดบอกตำแหน่งสไลด์ — เฉพาะการ์ดเดี่ยวบนมือถือ */}
                {cardOffset === 0 && (
                  <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5 sm:hidden">
                    {VISION_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`ดูรูปที่ ${i + 1}`}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/policies"
            className="glow-button group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-connext-primary-contrast shadow-lg shadow-connext-primary/30 transition duration-300 hover:scale-110 hover:shadow-xl hover:shadow-connext-secondary/50 active:scale-95"
          >
            ดูนโยบายทั้งหมด
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
