"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  pending_payment: "text-body",
  confirmed: "text-heading font-semibold",
  cancelled: "text-body line-through",
  completed: "text-accent font-semibold",
  no_show: "text-red-700 font-semibold",
  refunded: "text-body line-through",
};

export default function BookingStatusActions({
  id,
  status,
  hasContract,
}: {
  id: string;
  status: string;
  hasContract: boolean;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function setStatus(newStatus: string) {
    setSaving(true);
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-1">
      <span className={statusStyles[status] ?? ""}>{status.replace("_", " ")}</span>
      <div className="flex flex-wrap gap-2 text-xs">
        {status !== "cancelled" && status !== "completed" && (
          <button disabled={saving} onClick={() => setStatus("cancelled")} className="hover:underline">
            Cancel
          </button>
        )}
        {status === "confirmed" && (
          <>
            <button disabled={saving} onClick={() => setStatus("completed")} className="hover:underline">
              Mark completed
            </button>
            <button
              disabled={saving}
              onClick={() => setStatus("no_show")}
              className="text-red-700 hover:underline"
            >
              Mark no-show
            </button>
          </>
        )}
        <Link href={`/admin/contracts/${id}`} className="font-semibold text-accent hover:underline">
          {hasContract ? "View contract" : "Sign contract"}
        </Link>
      </div>
    </div>
  );
}
