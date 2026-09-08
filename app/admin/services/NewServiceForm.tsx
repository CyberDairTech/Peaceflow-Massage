"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NewServiceForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("60");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: `${slugify(name)}-${Date.now().toString(36)}`,
        name,
        durationMinutes: Number(duration),
        price: Number(price),
        description,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setName("");
      setDuration("60");
      setPrice("");
      setDescription("");
      setOpen(false);
      router.refresh();
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn btn-line">
        + Add Service
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-surface p-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm sm:col-span-2"
        />
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Minutes"
          type="number"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price ($)"
          type="number"
          step="0.01"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={2}
        className="mt-2 w-full rounded-sm border border-border bg-bg px-2 py-1 text-sm"
      />
      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-accent px-4 py-1.5 text-sm font-semibold text-surface hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-sm border border-border px-4 py-1.5 text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
