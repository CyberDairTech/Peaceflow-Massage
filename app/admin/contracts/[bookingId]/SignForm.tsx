"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignForm({
  bookingId,
  defaultName,
  defaultEmail,
}: {
  bookingId: string;
  defaultName: string;
  defaultEmail: string;
}) {
  const router = useRouter();
  const [signerName, setSignerName] = useState(defaultName);
  const [signerEmail, setSignerEmail] = useState(defaultEmail);
  const [initials, setInitials] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/contracts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, signerName, signerEmail, initials }),
    });
    setSaving(false);
    if (res.ok) {
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-sm border border-border bg-surface p-6">
      <p className="text-sm font-semibold text-heading">
        Hand this screen to your client to review and initial, then submit.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-heading">Client name</label>
          <input
            value={signerName}
            onChange={(e) => setSignerName(e.target.value)}
            required
            className="mt-1 w-full rounded-sm border border-border bg-bg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-heading">Client email</label>
          <input
            value={signerEmail}
            onChange={(e) => setSignerEmail(e.target.value)}
            type="email"
            required
            className="mt-1 w-full rounded-sm border border-border bg-bg px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-heading">Client initials</label>
        <input
          value={initials}
          onChange={(e) => setInitials(e.target.value)}
          required
          placeholder="e.g. M.J."
          className="mt-1 w-40 rounded-sm border border-border bg-bg px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="btn btn-solid"
      >
        {saving ? "Submitting…" : "Submit Signature"}
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}
