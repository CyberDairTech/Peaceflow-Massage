"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Service = { id: string; name: string; duration_minutes: number };
type DiscountCode = { id: string; code: string };

export default function NewBookingForm({
  services,
  discountCodes,
}: {
  services: Service[];
  discountCodes: DiscountCode[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [startTime, setStartTime] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [discountCodeId, setDiscountCodeId] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName,
        clientEmail,
        clientPhone,
        serviceId,
        startTime: new Date(startTime).toISOString(),
        amountPaid: amountPaid ? Number(amountPaid) : null,
        discountCodeId: discountCodeId || null,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setStartTime("");
      setAmountPaid("");
      setDiscountCodeId("");
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
        + Add Booking
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-surface p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Client name"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          placeholder="Client email"
          type="email"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          placeholder="Client phone"
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        >
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.duration_minutes} min)
            </option>
          ))}
        </select>
        <input
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          type="datetime-local"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          placeholder="Amount received ($, optional)"
          type="number"
          step="0.01"
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <select
          value={discountCodeId}
          onChange={(e) => setDiscountCodeId(e.target.value)}
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm sm:col-span-3"
        >
          <option value="">No discount code</option>
          {discountCodes.map((d) => (
            <option key={d.id} value={d.id}>
              {d.code}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-accent px-4 py-1.5 text-sm font-semibold text-surface hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add Booking"}
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
