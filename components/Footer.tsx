import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-connext-primary text-connext-primary-contrast">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 text-center sm:flex-row sm:items-center sm:py-8 sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="relative h-10 w-10 overflow-hidden rounded-md">
  <Image
    src="/images/logo-white.png" // หรือ .svg ถ้าเป็น SVG
    alt="Connext Logo"
    fill
    className="object-contain"
    priority
  />
</div>
          <div>
            <p className="text-base font-bold">พรรคคอนเน็กซ์</p>
            <p className="text-sm text-white/70">Connext Party</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="https://www.instagram.com/connext.party/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-button inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-connext-primary transition-transform hover:scale-105 active:scale-95"
          >
            ติดตามเราบน Instagram
          </Link>
          <Link
            href="https://www.facebook.com/share/1L5VBbTQHJ/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-button inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-connext-primary transition-transform hover:scale-105 active:scale-95 [animation-delay:-1.2s]"
          >
            ติดตามเราบน Facebook
          </Link>
        </div>
      </div>
    </footer>
  );
}
