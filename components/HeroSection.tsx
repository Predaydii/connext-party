"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SmartImage from "@/components/SmartImage";

type HeroPerson = {
  id: string;
  name: string;
  title: string;
  image: string;
  placeholderClass: string;
};

const HERO_PEOPLE: HeroPerson[] = [
  { id: "p1", name: "ไบรท์", title: "ประธานสภานักเรียน", image: "/images/hero/hero-1.png", placeholderClass: "from-connext-secondary to-connext-primary" },
  { id: "p2", name: "เดย์", title: "รองประธานฯ ฝ่ายบริหารวิชาการ", image: "/images/hero/hero-2.png", placeholderClass: "from-connext-light to-connext-secondary" },
  { id: "p3", name: "ฟิล์ม", title: "รองประธานฯ ฝ่ายบริหารกิจกรรม", image: "/images/hero/hero-3.png", placeholderClass: "from-blue-400 to-connext-primary" },
  { id: "p4", name: "อาเธอร์", title: "รองประธานฯ ฝ่ายบริหารทั่วไป", image: "/images/hero/hero-4.png", placeholderClass: "from-sky-300 to-connext-secondary" },
  { id: "p5", name: "แอมป์", title: "รองประธานฯ ฝ่ายบริหารกิจการนักเรียน", image: "/images/hero/hero-5.png", placeholderClass: "from-connext-secondary to-blue-900" },
];

/* Replace the inner content with a real cut-out photo (transparent PNG, 3:4).
   The bottom mask fades the image into the hero background like a poster. */
function PersonImage({ person }: { person: HeroPerson }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden">
      {/* วางรูปตัดพื้นหลัง (PNG โปร่งใส 3:4) ตาม path ใน HERO_PEOPLE */}
      <SmartImage
        src={person.image}
        alt={person.name}
        className="object-contain object-bottom"
        sizes="(min-width: 640px) 24vw, 58vw"
        priority
      />
    </div>
  );
}

export default function HeroSection() {
  // เริ่มที่คนแรก (ไบรท์) ทุกครั้งที่เข้าเว็บ
  const [activeIndex, setActiveIndex] = useState(0);
  const total = HERO_PEOPLE.length;
  const active = HERO_PEOPLE[activeIndex];

  const go = (dir: 1 | -1) => setActiveIndex((i) => (i + dir + total) % total);

  // บนมือถือ render แค่ 3 คน (ตัดการ์ด edge ออกจาก DOM ไปเลย) —
  // ถ้าใช้ display:none การ์ดที่โผล่มาใหม่จะถูก layout-animate จากมุมจอเหมือนพุ่งลงมาจากฟ้า
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // ปัด/ลากซ้าย-ขวาเพื่อเลื่อนคน (ทั้ง touch และเมาส์)
  const swipeStartX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    swipeStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const offsets = isDesktop ? [-2, -1, 0, 1, 2] : [-1, 0, 1];

  return (
    <section className="relative flex min-h-[calc(100dvh-64px)] flex-col overflow-hidden bg-gradient-to-b from-connext-primary via-connext-secondary to-connext-light">
      {/* animated background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-blob absolute -left-24 top-[8%] h-72 w-72 rounded-full bg-connext-light/40 blur-3xl" />
        <div className="hero-blob-slow absolute right-[-10%] top-[30%] h-96 w-96 rounded-full bg-white/15 blur-3xl" />
        <div className="hero-blob absolute bottom-[12%] left-[20%] h-80 w-80 rounded-full bg-connext-secondary/50 blur-3xl [animation-delay:-6s]" />
        <div className="hero-blob-slow absolute left-[55%] top-[5%] h-56 w-56 rounded-full bg-sky-300/30 blur-3xl [animation-delay:-4s]" />

      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-4 pt-10 sm:px-6 sm:pt-14">
        {/* headline sits behind the people like a poster */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="z-0 text-center text-white"
        >
          <h1 className="text-4xl font-bold tracking-tight drop-shadow-md sm:text-6xl">
            ตราษฯ
          </h1>
          <p className="mt-2 text-5xl font-extrabold tracking-tight drop-shadow-md sm:text-8xl">
            เป็นได้มากกว่านี้
          </p>
          {/* เบอร์ 1 ตัวใหญ่ — เฉพาะโทรศัพท์ */}
          <p className="mt-3 text-5xl font-extrabold tracking-tight drop-shadow-md sm:hidden">
            เบอร์ 1
          </p>
        </motion.div>

        {/* overlapping people, anchored to the bottom of the section */}
        <div
          className="relative z-10 -mt-6 mb-16 flex w-full flex-1 touch-pan-y select-none items-end justify-center sm:-mt-14 sm:mb-0"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {offsets.map((offset) => {
            const index = (activeIndex + offset + total) % total;
            const person = HERO_PEOPLE[index];
            const isCenter = offset === 0;
            const isEdge = Math.abs(offset) === 2;
            return (
              <motion.div
                key={person.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ scale: isCenter ? 1.18 : 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 170, damping: 24, mass: 0.9 }}
                style={{ transformOrigin: "bottom center", zIndex: 30 - Math.abs(offset) * 10 }}
                onClick={() => !isCenter && setActiveIndex(index)}
                className={`w-[92%] shrink-0 sm:w-[40%] ${isEdge ? "hidden sm:block" : ""} ${
                  isCenter
                    ? ""
                    : "cursor-pointer opacity-95 transition-[filter] duration-300 hover:brightness-110"
                } ${offset !== 0 ? (offset < 0 ? "-mr-[48%] sm:-mr-[23%]" : "-ml-[48%] sm:-ml-[23%]") : ""}`}
              >
                <PersonImage person={person} />
              </motion.div>
            );
          })}

          {/* gradient ทับขอบล่างของทุกคนพร้อมกัน กว้างเต็มจอ ให้กลืนกับพื้นหลังโดยคนไม่ทะลุกัน
              บนมือถือลากลงไปปิดถึงขอบล่างสุดของ hero (ชดเชย mb-16 ของแถวคน) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 left-1/2 z-[35] h-56 w-screen -translate-x-1/2 bg-gradient-to-t from-connext-light via-connext-light/90 to-transparent sm:bottom-0 sm:h-48 sm:via-connext-light/80"
          />

          {/* name of the featured person, overlaid at the bottom center */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-40 flex flex-col items-center text-center text-white sm:bottom-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-3xl font-extrabold drop-shadow-md sm:text-4xl">{active.name}</p>
                <p className="mt-1 text-lg font-medium text-white/90 sm:text-xl">{active.title}</p>
              </motion.div>
            </AnimatePresence>
            <a
              href="#about-connext"
              className="pointer-events-auto mt-3 inline-flex items-center gap-1.5 border-b border-white/70 pb-0.5 text-sm font-semibold transition hover:border-white"
            >
              ทำความรู้จัก
              <span aria-hidden className="animate-bounce">↓</span>
            </a>
          </div>

          {/* arrows */}
          <button
            type="button"
            aria-label="ดูคนก่อนหน้า"
            onClick={() => go(-1)}
            className="absolute left-1 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur transition hover:bg-white/30 sm:left-4 sm:h-12 sm:w-12"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="ดูคนถัดไป"
            onClick={() => go(1)}
            className="absolute right-1 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur transition hover:bg-white/30 sm:right-4 sm:h-12 sm:w-12"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
