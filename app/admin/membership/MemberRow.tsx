"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ServiceOption = { id: string; name: string; groupName: string; price_cents: number };
type Deliverable = { service_id: string; quantity_per_month: number };

type MemberData = {
  id: string;
  status: string;
  discount_percent: number;
  monthly_price_cents: number;
  card_last4: string | null;
  card_exp_month: number | null;
  card_exp_year: number | null;
  card_name: string | null;
  clients: { name: string; email: string; phone: string | null } | null;
};

export default function MemberRow({
  member,
  deliverables,
  services,
}: {
  member: MemberData;
  deliverables: Deliverable[];
  services: ServiceOption[];
}) {
  const router = useRouter();
  const [managing, setManaging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [discountPercent, setDiscountPercent] = useState(member.discount_percent);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(deliverables.map((d) => [d.service_id, d.quantity_per_month])),
  );
  const [cardLast4, setCardLast4] = useState(member.card_last4 ?? "");
  const [cardExpMonth, setCardExpMonth] = useState(member.card_exp_month?.toString() ?? "");
  const [cardExpYear, setCardExpYear] = useState(member.card_exp_year?.toString() ?? "");
  const [cardName, setCardName] = useState(member.card_name ?? "");

  const serviceById = useMemo(() => new Map(services.map((s) => [s.id, s])), [services]);

  const { normalTotal, discountedTotal } = useMemo(() => {
    let normal = 0;
    for (const [id, qty] of Object.entries(quantities)) {
      normal += (serviceById.get(id)?.price_cents ?? 0) * qty;
    }
    return { normalTotal: normal, discountedTotal: Math.round(normal * (1 - discountPercent / 100)) };
  }, [quantities, discountPercent, serviceById]);

  async function save() {
    setSaving(true);
    setError(null);
    const newDeliverables = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([serviceId, quantity]) => ({ serviceId, quantity }));

    const res = await fetch("/api/admin/members", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: member.id,
        deliverables: newDeliverables,
        discountPercent,
        cardLast4,
        cardExpMonth: cardExpMonth ? Number(cardExpMonth) : null,
        cardExpYear: cardExpYear ? Number(cardExpYear) : null,
        cardName,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setManaging(false);
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong.");
    }
  }

  async function removeMember() {
    if (!confirm(`Remove ${member.clients?.name} as a member? This can't be undone.`)) return;
    setSaving(true);
    await fetch("/api/admin/members", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: member.id }),
    });
    setSaving(false);
    router.refresh();
  }

  const groups = Array.from(new Set(services.map((s) => s.groupName)));

  if (managing) {
    return (
      <tr className="border-t border-border-soft align-top">
        <td className="px-4 py-4" colSpan={5}>
          <div className="space-y-3">
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
                          className="w-20 rounded-sm border border-border bg-surface px-2 py-1 text-sm"
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-heading">Discount</label>
              <input
                type="number"
                min={0}
                max={100}
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-20 rounded-sm border border-border bg-surface px-2 py-1 text-sm"
              />
              <span className="text-sm text-body">%</span>
            </div>

            <div className="rounded-sm border border-gold bg-linen/40 p-3 text-sm">
              <div className="flex justify-between text-body">
                <span>Normal total</span>
                <span>${(normalTotal / 100).toFixed(2)}/mo</span>
              </div>
              <div className="mt-1 flex justify-between font-semibold text-heading">
                <span>Membership price</span>
                <span>${(discountedTotal / 100).toFixed(2)}/mo</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-heading">
                Card on file <span className="font-normal text-body">(reference only)</span>
              </p>
              <div className="mt-2 grid gap-3 sm:grid-cols-4">
                <input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Name on card"
                  className="rounded-sm border border-border bg-surface px-2 py-1 text-sm sm:col-span-2"
                />
                <input
                  value={cardLast4}
                  onChange={(e) => setCardLast4(e.target.value.slice(0, 4))}
                  placeholder="Last 4"
                  maxLength={4}
                  className="rounded-sm border border-border bg-surface px-2 py-1 text-sm"
                />
                <div className="flex gap-1">
                  <input
                    value={cardExpMonth}
                    onChange={(e) => setCardExpMonth(e.target.value.slice(0, 2))}
                    placeholder="MM"
                    maxLength={2}
                    className="w-14 rounded-sm border border-border bg-surface px-2 py-1 text-sm"
                  />
                  <input
                    value={cardExpYear}
                    onChange={(e) => setCardExpYear(e.target.value.slice(0, 4))}
                    placeholder="YYYY"
                    maxLength={4}
                    className="w-16 rounded-sm border border-border bg-surface px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={save}
                disabled={saving}
                className="rounded-sm bg-accent px-4 py-1.5 text-sm font-semibold text-surface hover:opacity-90 disabled:opacity-60"
              >
                Save
              </button>
              <button
                onClick={() => setManaging(false)}
                className="rounded-sm border border-border px-4 py-1.5 text-sm"
              >
                Cancel
              </button>
              {error && <span className="text-sm text-red-700">{error}</span>}
            </div>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t border-border-soft align-top">
      <td className="px-4 py-3">
        <div className="font-semibold text-heading">{member.clients?.name}</div>
        <div className="text-body">{member.clients?.email}</div>
        {member.clients?.phone && <div className="text-body">{member.clients.phone}</div>}
      </td>
      <td className="px-4 py-3">
        <ul className="space-y-0.5">
          {deliverables.map((d) => (
            <li key={d.service_id}>
              {serviceById.get(d.service_id)?.name ?? "Unknown service"} × {d.quantity_per_month}/mo
            </li>
          ))}
        </ul>
      </td>
      <td className="px-4 py-3 font-semibold text-heading">
        ${(member.monthly_price_cents / 100).toFixed(2)}/mo
        <div className="text-xs font-normal text-body">{member.discount_percent}% off</div>
      </td>
      <td className="px-4 py-3">
        {member.card_last4 ? (
          <div>
            <div>{member.card_name}</div>
            <div className="text-body">
              •••• {member.card_last4}
              {member.card_exp_month && member.card_exp_year
                ? ` · ${String(member.card_exp_month).padStart(2, "0")}/${member.card_exp_year}`
                : ""}
            </div>
          </div>
        ) : (
          <span className="text-body">—</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-3 text-sm">
          <button onClick={() => setManaging(true)} className="font-semibold text-accent hover:underline">
            Manage
          </button>
          <button onClick={removeMember} disabled={saving} className="text-red-700 hover:underline">
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
}
