/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // รูปที่แอดมินอัปโหลดจะถูกเก็บบน Vercel Blob แล้วเสิร์ฟจากโดเมนนี้
        // ถ้าไม่อนุญาตไว้ next/image จะไม่ยอมแสดงรูปที่อัปโหลดใหม่
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
