"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type BlockedSlot = {
  id: string;
  start_time: string;
  end_time: string;
  reason: string | null;
};

function Row({ slot }: { slot: BlockedSlot }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function remove() {
    if (!confirm("Remove this blocked time?")) return;
    setSaving(true);
    await fetch("/api/admin/blocked-dates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: slot.id }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <tr className="border-t border-border-soft">
      <td className="px-4 py-3">{new Date(slot.start_time).toLocaleString()}</td>
      <td className="px-4 py-3">{new Date(slot.end_time).toLocaleString()}</td>
      <td className="px-4 py-3 text-body">{slot.reason}</td>
      <td className="px-4 py-3">
        <button onClick={remove} disabled={saving} className="text-sm text-red-700 hover:underline">
          Remove
        </button>
      </td>
    </tr>
  );
}

function NewBlockForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/blocked-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startTime: new Date(start).toISOString(),
        endTime: new Date(end).toISOString(),
        reason,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setStart("");
      setEnd("");
      setReason("");
      setOpen(false);
      router.refresh();
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn btn-line">
        + Block a Date/Time
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-surface p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-heading">From</span>
          <input
            value={start}
            onChange={(e) => setStart(e.target.value)}
            type="datetime-local"
            required
            className="w-full rounded-sm border border-border bg-bg px-2 py-1 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-heading">To</span>
          <input
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            type="datetime-local"
            required
            className="w-full rounded-sm border border-border bg-bg px-2 py-1 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-heading">Reason (private)</span>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. vacation"
            className="w-full rounded-sm border border-border bg-bg px-2 py-1 text-sm"
          />
        </label>
      </div>
      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-accent px-4 py-1.5 text-sm font-semibold text-surface hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Adding…" : "Block"}
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

export default function BlockedDatesClient({ slots }: { slots: BlockedSlot[] }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl">Blocked Dates</h1>
        <NewBlockForm />
      </div>
      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-heading">
            <tr>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">To</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((s) => (
              <Row key={s.id} slot={s} />
            ))}
            {slots.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-body">
                  Nothing blocked out.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
