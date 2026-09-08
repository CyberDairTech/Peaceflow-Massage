"use client";

import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";

export default function ServiceMenuRow({ group }: { group: { groupName: string; services: Service[] } }) {
  const [selectedSlug, setSelectedSlug] = useState(group.services[0].slug);
  const selected = group.services.find((s) => s.slug === selectedSlug) ?? group.services[0];

  return (
    <div className="menu-row">
      <div className="info">
        <div className="name">{group.groupName}</div>
        <div className="desc">{selected.description}</div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          aria-label={`${group.groupName} duration`}
          className="rounded-sm border border-border bg-surface px-3 py-2 text-sm"
        >
          {group.services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.durationMinutes} min — ${s.price}
            </option>
          ))}
        </select>
        <Link href={`/book/${selected.slug}`} className="btn btn-solid">
          Book This Service
        </Link>
      </div>
    </div>
  );
}
