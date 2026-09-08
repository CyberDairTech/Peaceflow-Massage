"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ServiceOption = { id: string; name: string; groupName: string; price_cents: number };

export default function NewMemberForm({ services }: { services: ServiceOption[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [discountPercent, setDiscountPercent] = useState(15);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cardLast4, setCardLast4] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const [cardName, setCardName] = useState("");

  const { normalTotal, discountedTotal } = useMemo(() => {
    let normal = 0;
    for (const s of services) {
      const qty = quantities[s.id] ?? 0;
      normal += s.price_cents * qty;
    }
    return { normalTotal: normal, discountedTotal: Math.round(normal * (1 - discountPercent / 100)) };
  }, [services, quantities, discountPercent]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const deliverables = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([serviceId, quantity]) => ({ serviceId, quantity }));

    if (deliverables.length === 0) {
      setError("Pick at least one service with a quantity of 1 or more.");
      return;
    }

    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        deliverables,
        discountPercent,
        cardLast4,
        cardExpMonth: cardExpMonth ? Number(cardExpMonth) : undefined,
        cardExpYear: cardExpYear ? Number(cardExpYear) : undefined,
        cardName,
      }),
    });
    setSaving(false);
    if (res.ok) {
      router.refresh();
      setOpen(false);
      setName("");
      setEmail("");
      setPhone("");
      setQuantities({});
      setCardLast4("");
      setCardExpMonth("");
      setCardExpYear("");
      setCardName("");
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong.");
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn btn-line">
        + Add New Member
      </button>
    );
  }

  const groups = Array.from(new Set(services.map((s) => s.groupName)));

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-surface p-5">
      <h2 className="text-lg text-heading">New Member</h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Client name"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Client email"
          type="email"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Client phone"
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
      </div>

      <h3 className="mt-5 text-sm font-semibold text-heading">Deliverables — sessions per month</h3>
      <div className="mt-2 space-y-3">
        {groups.map((group) => (
          <div key={group}>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-text">{group}</p>
            <div className="mt-1 space-y-1">
              {services
                .filter((s) => s.groupName === group)
                .map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-body">
                      {s.name} — ${(s.price_cents / 100).toFixed(2)}
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={quantities[s.id] ?? 0}
                      onChange={(e) =>
                        setQuantities((q) => ({ ...q, [s.id]: Math.max(0, Number(e.target.value)) }))
                      }
                      className="w-20 rounded-sm border border-border bg-bg px-2 py-1 text-sm"
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <label className="text-sm font-semibold text-heading">Membership discount</label>
        <input
          type="number"
          min={0}
          max={100}
          value={discountPercent}
          onChange={(e) => setDiscountPercent(Number(e.target.value))}
          className="w-20 rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <span className="text-sm text-body">%</span>
      </div>

      <div className="mt-3 rounded-sm border border-gold bg-linen/40 p-3 text-sm">
        <div className="flex justify-between text-body">
          <span>Normal total</span>
          <span>${(normalTotal / 100).toFixed(2)}/mo</span>
        </div>
        <div className="mt-1 flex justify-between font-semibold text-heading">
          <span>Membership price</span>
          <span>${(discountedTotal / 100).toFixed(2)}/mo</span>
        </div>
      </div>

      <h3 className="mt-5 text-sm font-semibold text-heading">
        Card on file <span className="font-normal text-body">(reference only — see note below)</span>
      </h3>
      <div className="mt-2 grid gap-3 sm:grid-cols-4">
        <input
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Name on card"
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm sm:col-span-2"
        />
        <input
          value={cardLast4}
          onChange={(e) => setCardLast4(e.target.value.slice(0, 4))}
          placeholder="Last 4"
          maxLength={4}
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <div className="flex gap-1">
          <input
            value={cardExpMonth}
            onChange={(e) => setCardExpMonth(e.target.value.slice(0, 2))}
            placeholder="MM"
            maxLength={2}
            className="w-14 rounded-sm border border-border bg-bg px-2 py-1 text-sm"
          />
          <input
            value={cardExpYear}
            onChange={(e) => setCardExpYear(e.target.value.slice(0, 4))}
            placeholder="YYYY"
            maxLength={4}
            className="w-16 rounded-sm border border-border bg-bg px-2 py-1 text-sm"
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-body">
        Automatic monthly billing via Stripe isn&apos;t connected yet — these
        fields are just for your own reference until that&apos;s wired up.
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-accent px-4 py-1.5 text-sm font-semibold text-surface hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add Member"}
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
