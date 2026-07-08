"use client";

import { useEffect, useRef, useState } from "react";

/* วางไฟล์วิดีโอที่ public/videos/culture.mp4 แล้ววิดีโอจะเล่นวนแทน placeholder เอง
   ถ้ายังไม่มีไฟล์ จะแสดงปุ่ม play แบบเดิม */
export default function FeatureVideo({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ไฟล์หายอาจ error ตั้งแต่ก่อน React ผูก onError — เช็คซ้ำตอน mount
  useEffect(() => {
    if (videoRef.current?.error) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 backdrop-blur transition group-hover:scale-110 group-hover:bg-white/40">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
    />
  );
}
