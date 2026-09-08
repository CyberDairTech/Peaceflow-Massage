"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });
    setSaving(false);
    if (res.ok) {
      setName("");
      setEmail("");
      setPhone("");
      setOpen(false);
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong.");
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn btn-line">
        + Add Client
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-surface p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (optional)"
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-accent px-4 py-1.5 text-sm font-semibold text-surface hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add Client"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-sm border border-border px-4 py-1.5 text-sm"
        >
          Cancel
        </button>
        {error && <span className="text-sm text-red-700">{error}</span>}
      </div>
    </form>
  );
}
