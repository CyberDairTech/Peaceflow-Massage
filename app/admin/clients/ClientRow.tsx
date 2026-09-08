"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ClientRowData = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
};

export default function ClientRow({
  client,
  noShows,
}: {
  client: ClientRowData;
  noShows: number;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone ?? "");

  async function save() {
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/clients", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: client.id, name, email, phone }),
    });
    setSaving(false);
    if (res.ok) {
      setEditing(false);
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong.");
    }
  }

  if (editing) {
    return (
      <tr className="border-t border-border-soft align-top">
        <td className="px-4 py-3" colSpan={5}>
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="rounded-sm border border-border bg-surface px-2 py-1 text-sm"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="rounded-sm border border-border bg-surface px-2 py-1 text-sm"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="rounded-sm border border-border bg-surface px-2 py-1 text-sm"
            />
          </div>
          <div className="mt-2 flex items-center gap-2">
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
            {error && <span className="text-sm text-red-700">{error}</span>}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t border-border-soft">
      <td className="px-4 py-3">{client.name}</td>
      <td className="px-4 py-3">{client.email}</td>
      <td className="px-4 py-3">{client.phone ?? "—"}</td>
      <td className="px-4 py-3">{new Date(client.created_at).toLocaleDateString()}</td>
      <td className="px-4 py-3">
        <span className={noShows >= 2 ? "font-semibold text-red-700" : ""}>
          {noShows}
          {noShows >= 2 ? " — blocked from rebooking" : ""}
        </span>
      </td>
      <td className="px-4 py-3">
        <button onClick={() => setEditing(true)} className="text-sm font-semibold text-accent hover:underline">
          Edit
        </button>
      </td>
    </tr>
  );
}
