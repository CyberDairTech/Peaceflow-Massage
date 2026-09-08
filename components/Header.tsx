"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cta } from "@/lib/site-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="border-b border-border-soft bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="wordmark text-2xl text-heading" onClick={() => setMenuOpen(false)}>
          peaceflow
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-body md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b pb-0.5 hover:border-gold hover:text-heading ${
                isActive(link.href) ? "border-gold text-heading" : "border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link href="/services" className="btn btn-solid">
            {cta}
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center text-heading md:hidden"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border-soft bg-surface px-6 py-4 text-sm md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-sm px-2 py-2.5 ${
                isActive(link.href)
                  ? "border-l-2 border-gold bg-linen/40 text-heading"
                  : "text-body hover:bg-linen/30"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/services"
            onClick={() => setMenuOpen(false)}
            className="btn btn-solid mt-3 justify-center"
          >
            {cta}
          </Link>
        </nav>
      )}
    </header>
  );
}
