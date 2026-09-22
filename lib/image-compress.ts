/* ย่อรูปในเบราว์เซอร์ก่อนส่งขึ้นเซิร์ฟเวอร์
   เหตุผล: รูปจากกล้องมือถือมักหนัก 3-8MB แต่ Server Action รับ body ได้ราว 4.5MB
   ถ้าไม่ย่อก่อน ผู้ใช้จะอัปรูปจากมือถือไม่ได้เลย

   ย่อด้านยาวสุดเหลือ 1600px + บีบเป็น JPEG คุณภาพ 0.85
   ได้ไฟล์ราว 200-500KB ซึ่งยังคมพอสำหรับทุกจุดที่เว็บใช้ (การ์ด 4:5 และภาพข่าว) */

const MAX_EDGE = 1600;
const QUALITY = 0.85;
/** ไฟล์เล็กกว่านี้ไม่ต้องแตะ — ย่อไปก็ไม่ได้อะไรและอาจเสียคุณภาพฟรี ๆ */
const SKIP_BELOW_BYTES = 400 * 1024;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("อ่านไฟล์รูปไม่ได้"));
    };
    img.src = url;
  });
}

export async function compressImage(file: File): Promise<File> {
  // GIF อาจเป็นภาพเคลื่อนไหว — วาดลง canvas แล้วจะเหลือเฟรมเดียว เลยปล่อยผ่าน
  if (file.type === "image/gif") return file;
  if (file.size <= SKIP_BELOW_BYTES) return file;

  try {
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
    const width = Math.round(img.width * scale);
    const height = Math.round(img.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", QUALITY)
    );
    if (!blob || blob.size >= file.size) return file; // ย่อแล้วไม่เล็กลง ใช้ของเดิม

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    // ย่อไม่สำเร็จก็ส่งไฟล์เดิมไป ให้ฝั่งเซิร์ฟเวอร์เป็นคนบอกว่าใหญ่เกิน
    return file;
  }
}

export async function compressAll(files: File[]): Promise<File[]> {
  return Promise.all(files.map(compressImage));
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
