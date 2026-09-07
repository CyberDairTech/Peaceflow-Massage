import Link from "next/link";
import { cta } from "@/lib/site-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-border-soft bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="wordmark text-2xl text-heading">
          peaceflow
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-body md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-heading">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/services" className="btn btn-solid">
          {cta}
        </Link>
      </div>
    </header>
  );
}
