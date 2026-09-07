import Link from "next/link";
import { business, hours } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 text-sm text-body md:grid-cols-3">
        <div>
          <p className="wordmark text-xl text-heading">peaceflow</p>
          <span className="mt-2 block h-0.5 w-7 bg-gold" />
          <p className="mt-3">
            {business.address.line1}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
          </p>
          <p className="mt-2">
            <a href={`tel:${business.phone}`} className="hover:text-heading">
              {business.phone}
            </a>
          </p>
          <p className="mt-2">
            <a href={business.instagramUrl} className="hover:text-heading">
              {business.instagram}
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-heading">Hours</p>
          <ul className="mt-3 space-y-1">
            {hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-heading">Explore</p>
          <ul className="mt-3 space-y-1">
            <li>
              <Link href="/services" className="hover:text-heading">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-heading">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-heading">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-heading">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border-soft px-6 py-4 text-center text-xs text-body">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </div>
    </footer>
  );
}
