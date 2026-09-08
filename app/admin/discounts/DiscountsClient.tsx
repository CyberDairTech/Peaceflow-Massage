"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DiscountCode = {
  id: string;
  code: string;
  description: string | null;
  discount_type: "percent" | "fixed";
  amount: number;
  active: boolean;
  times_redeemed: number;
  max_redemptions: number | null;
  expires_at: string | null;
};

function formatAmount(d: DiscountCode) {
  return d.discount_type === "percent" ? `${d.amount}%` : `$${(d.amount / 100).toFixed(2)}`;
}

function Row({ code }: { code: DiscountCode }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function toggleActive() {
    setSaving(true);
    await fetch("/api/admin/discounts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: code.id, active: !code.active }),
    });
    setSaving(false);
    router.refresh();
  }

  async function remove() {
    if (!confirm(`Delete code "${code.code}"?`)) return;
    setSaving(true);
    await fetch("/api/admin/discounts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: code.id }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <tr className={`border-t border-border-soft ${!code.active ? "opacity-50" : ""}`}>
      <td className="px-4 py-3 font-semibold text-heading">{code.code}</td>
      <td className="px-4 py-3">{formatAmount(code)}</td>
      <td className="px-4 py-3 text-body">{code.description}</td>
      <td className="px-4 py-3">
        {code.times_redeemed}
        {code.max_redemptions ? ` / ${code.max_redemptions}` : ""}
      </td>
      <td className="px-4 py-3">
        {code.expires_at ? new Date(code.expires_at).toLocaleDateString() : "—"}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-3 text-sm">
          <button onClick={toggleActive} disabled={saving} className="font-semibold text-accent hover:underline">
            {code.active ? "Deactivate" : "Activate"}
          </button>
          <button onClick={remove} disabled={saving} className="text-red-700 hover:underline">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

function NewCodeForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">("fixed");
  const [amount, setAmount] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/discounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        description,
        discountType,
        amount: Number(amount),
        expiresAt: expiresAt || null,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setCode("");
      setDescription("");
      setAmount("");
      setExpiresAt("");
      setOpen(false);
      router.refresh();
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn btn-line">
        + Add Discount Code
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-surface p-4">
      <div className="grid gap-3 sm:grid-cols-5">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="CODE"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm uppercase"
        />
        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value as "percent" | "fixed")}
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        >
          <option value="fixed">$ off</option>
          <option value="percent">% off</option>
        </select>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={discountType === "fixed" ? "Amount ($)" : "Amount (%)"}
          type="number"
          step="0.01"
          required
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          type="date"
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="rounded-sm border border-border bg-bg px-2 py-1 text-sm"
        />
      </div>
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

export default function DiscountsClient({ codes }: { codes: DiscountCode[] }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl">Discount Codes</h1>
        <NewCodeForm />
      </div>
      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-heading">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Redeemed</th>
              <th className="px-4 py-3">Expires</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((c) => (
              <Row key={c.id} code={c} />
            ))}
            {codes.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-body">
                  No discount codes yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
