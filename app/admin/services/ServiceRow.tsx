"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ServiceRowData = {
  id: string;
  name: string;
  duration_minutes: number;
  price_cents: number;
  description: string | null;
  active: boolean;
};

export default function ServiceRow({ service }: { service: ServiceRowData }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(service.name);
  const [duration, setDuration] = useState(String(service.duration_minutes));
  const [price, setPrice] = useState(String(service.price_cents / 100));
  const [description, setDescription] = useState(service.description ?? "");

  async function save() {
    setSaving(true);
    await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: service.id,
        name,
        durationMinutes: Number(duration),
        price: Number(price),
        description,
      }),
    });
    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  async function toggleActive() {
    setSaving(true);
    await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: service.id, active: !service.active }),
    });
    setSaving(false);
    router.refresh();
  }

  async function remove() {
    if (!confirm(`Delete "${service.name}"? This can't be undone.`)) return;
    setSaving(true);
    await fetch("/api/admin/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: service.id }),
    });
    setSaving(false);
    router.refresh();
  }

  if (editing) {
    return (
      <tr className="border-t border-border-soft align-top">
        <td className="px-4 py-3" colSpan={5}>
          <div className="grid gap-3 sm:grid-cols-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="rounded-sm border border-border bg-surface px-2 py-1 text-sm sm:col-span-2"
            />
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Minutes"
              type="number"
              className="rounded-sm border border-border bg-surface px-2 py-1 text-sm"
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price ($)"
              type="number"
              step="0.01"
              className="rounded-sm border border-border bg-surface px-2 py-1 text-sm"
            />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={2}
            className="mt-2 w-full rounded-sm border border-border bg-surface px-2 py-1 text-sm"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-sm bg-accent px-4 py-1.5 text-sm font-semibold text-surface hover:opacity-90 disabled:opacity-60"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="rounded-sm border border-border px-4 py-1.5 text-sm"
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className={`border-t border-border-soft ${!service.active ? "opacity-50" : ""}`}>
      <td className="px-4 py-3">{service.name}</td>
      <td className="px-4 py-3">{service.duration_minutes} min</td>
      <td className="px-4 py-3">${(service.price_cents / 100).toFixed(2)}</td>
      <td className="px-4 py-3 max-w-xs text-body">{service.description}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-3 text-sm">
          <button onClick={() => setEditing(true)} className="font-semibold text-accent hover:underline">
            Edit
          </button>
          <button onClick={toggleActive} disabled={saving} className="hover:underline">
            {service.active ? "Deactivate" : "Activate"}
          </button>
          <button onClick={remove} disabled={saving} className="text-red-700 hover:underline">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
