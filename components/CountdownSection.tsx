"use client";

import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";

// วันเลือกตั้ง 10 กรกฎาคม 2569 (พ.ศ.) เวลา 11:00 น. เวลาท้องถิ่น
const ELECTION_DATE = new Date("2026-07-10T11:00:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, ELECTION_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1 sm:gap-1.5">
        {text.split("").map((digit, i) => (
          <span
            key={i}
            className="relative flex h-14 w-10 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-gray-700 via-gray-900 to-black text-3xl font-extrabold text-white shadow-lg sm:h-20 sm:w-14 sm:text-5xl"
          >
            {digit}
            {/* flip-clock split line */}
            <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/60" />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/10" />
          </span>
        ))}
      </div>
      <span className="text-xs font-medium text-white/80 sm:text-sm">{label}</span>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* วางภาพกิจกรรมที่ public/images/countdown/bg.png แล้วภาพจะขึ้นแทน gradient เอง */}
      <div className="absolute inset-0 bg-gradient-to-br from-connext-secondary via-connext-primary to-blue-950" />
      <SmartImage src="/images/countdown/bg.png" alt="กิจกรรมพรรคคอนเน็กซ์" sizes="100vw" />
      {/* blue overlay ให้ตัวเลขเด่นเหมือน ref-countdown */}
      <div className="absolute inset-0 bg-connext-primary/70" />

      {/* แถบ banner สัดส่วนตามภาพ 851x315 (~2.7:1) — ความสูงไล่ตามความกว้างจอ */}
      <div className="relative mx-auto flex min-h-[340px] max-w-6xl flex-col items-center justify-center px-4 py-12 text-center text-white sm:min-h-[clamp(340px,37vw,520px)] sm:px-6 sm:py-14">
        <h2 className="text-3xl font-extrabold drop-shadow sm:text-4xl">
          นับถอยหลังวันเลือกตั้ง
        </h2>
        <p className="mt-3 text-lg font-semibold text-white/90 sm:text-2xl">
          อยากเห็นสภาหน้าใหม่ ทำงานเป็น เลือกพวกเราเบอร์ 1
        </p>

        <div className="mt-10 flex items-start gap-3 sm:mt-12 sm:gap-6">
          {timeLeft ? (
            <>
              <FlipUnit value={timeLeft.days} label="วัน" />
              <FlipUnit value={timeLeft.hours} label="ชั่วโมง" />
              <FlipUnit value={timeLeft.minutes} label="นาที" />
              <FlipUnit value={timeLeft.seconds} label="วินาที" />
            </>
          ) : (
            // โครงว่างระหว่างรอ client mount กันหน้ากระตุก
            <div className="h-[88px] sm:h-[116px]" aria-hidden />
          )}
        </div>
      </div>
    </section>
  );
}
