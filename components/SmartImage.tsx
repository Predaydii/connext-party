"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* รูปแบบ fill ที่ซ่อนตัวเองถ้าไฟล์ยังไม่มี — placeholder ที่วางไว้ข้างหลังจะโผล่แทน
   พอวางไฟล์รูปตาม path แล้วรูปจะขึ้นเองทันที ไม่ต้องแก้โค้ด */
export default function SmartImage({
  src,
  alt,
  className = "object-cover",
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // ไฟล์หายอาจ error/โหลดเสร็จตั้งแต่ก่อน React ผูก listener — เช็คซ้ำตอน mount
  useEffect(() => {
    const el = imgRef.current;
    if (!el || !el.complete) return;
    if (el.naturalWidth === 0) setFailed(true);
    else setLoaded(true);
  }, []);

  if (failed) return null;
  return (
    <>
      {/* skeleton ระหว่างรอโหลดรูป */}
      {!loaded && (
        <span aria-hidden className="absolute inset-0 animate-pulse bg-white/20" />
      )}
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
}
