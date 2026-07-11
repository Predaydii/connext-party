import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "เกี่ยวกับพรรค | พรรคคอนเน็กซ์",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="บริหารจัดการอย่างเป็นระบบ"
        subtitle="ด้วยเทคโนโลยีดิจิทัลและการบริหารจัดการแบบมีส่วนร่วม"
        image="/images/page-hero/about.png"
      />

      {/* Connext Book (PDF) — อ่านในเว็บบนคอม / มือถือกดเปิดในแท็บใหม่ */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-center text-3xl font-extrabold text-connext-primary sm:text-4xl">
          Connext Book
        </h2>
        <p className="mt-3 text-center text-base text-gray-600 sm:text-lg">
          รู้จักพรรคคอนเน็กซ์แบบครบทุกเรื่องในเล่มเดียว
        </p>

        {/* เดสก์ท็อป/แท็บเล็ต: อ่านในหน้าได้เลย */}
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-gray-200 shadow-lg sm:block">
          <iframe
            src="/ConnextBook.pdf#view=FitH"
            title="Connext Book"
            className="h-[85vh] w-full"
          />
        </div>

        {/* มือถือ: เบราว์เซอร์ส่วนใหญ่ไม่แสดง PDF ในหน้า ให้กดเปิดแทน */}
        <a
          href="/ConnextBook.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-b from-connext-primary to-connext-secondary p-8 text-center text-white shadow-lg transition active:scale-95 sm:hidden"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-3xl">
            📖
          </span>
          <span className="text-lg font-bold">แตะเพื่อเปิดอ่าน Connext Book</span>
          <span className="text-sm text-white/80">ไฟล์ PDF ขนาด ~33MB</span>
        </a>

        <div className="mt-6 hidden text-center sm:block">
          <a
            href="/ConnextBook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-connext-primary px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-connext-secondary active:scale-95"
          >
            เปิดเต็มจอ / ดาวน์โหลด
          </a>
        </div>
      </section>
    </>
  );
}
