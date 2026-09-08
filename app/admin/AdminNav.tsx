"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Inquiries" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/blocked-dates", label: "Blocked Dates" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/discounts", label: "Discount Codes" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/contracts", label: "Contracts" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-border-soft bg-surface px-6">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold ${
              active
                ? "border-gold text-heading"
                : "border-transparent text-body hover:text-heading"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
