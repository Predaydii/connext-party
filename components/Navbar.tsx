"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/about", label: "เกี่ยวกับพรรค" },
  { href: "/leaders", label: "ประวัติแกนนำ" },
  { href: "/members", label: "สมาชิกพรรค" },
  { href: "/policies", label: "นโยบายพรรค" },
  { href: "/news", label: "ข่าวกิจกรรม" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow ${
        isScrolled ? "shadow-md" : ""
      } bg-white`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <div className="relative h-10 w-10 overflow-hidden rounded-md">
  <Image
    src="/images/logo-blue.png" // หรือ .svg ถ้าเป็น SVG
    alt="Connext Logo"
    fill
    className="object-contain"
    priority
  />
</div>
          <span className="text-base font-bold text-connext-primary">พรรคคอนเน็กซ์</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-connext-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="เปิดเมนู"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-connext-primary transition-transform ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-connext-primary transition-opacity ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-connext-primary transition-transform ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-gray-100 px-4 py-3 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md px-2 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-connext-light/10 hover:text-connext-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
