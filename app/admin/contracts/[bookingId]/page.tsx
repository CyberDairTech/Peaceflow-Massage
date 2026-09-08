import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import { contractPolicyParagraphs } from "@/lib/contract";
import SignForm from "./SignForm";

export default async function AdminContractPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const supabase = await createServerSupabaseClient();

  const [{ data: booking }, { data: contract }] = await Promise.all([
    supabase
      .from("bookings")
      .select("*, services(name), clients(name,email)")
      .eq("id", bookingId)
      .single(),
    supabase.from("contracts").select("*").eq("booking_id", bookingId).maybeSingle(),
  ]);

  if (!booking) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <p className="text-body">Booking not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl">Session Agreement</h1>
      <p className="mt-2 text-sm text-body">
        {booking.clients?.name} · {booking.services?.name} ·{" "}
        {new Date(booking.start_time).toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-body">
        {booking.amount_paid_cents != null
          ? `Receipt: $${(booking.amount_paid_cents / 100).toFixed(2)} paid`
          : "Receipt: amount not recorded"}
      </p>

      <div className="mt-6 space-y-3 rounded-sm border border-border bg-linen/40 p-6 text-sm text-body">
        {contractPolicyParagraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "font-semibold text-heading" : ""}>
            {p}
          </p>
        ))}
      </div>

      {contract?.signed_at ? (
        <div className="mt-6 rounded-sm border border-gold bg-surface p-6">
          <p className="font-semibold text-heading">Signed</p>
          <p className="mt-1 text-sm text-body">
            {contract.signer_name} (initials: {contract.initials}) —{" "}
            {new Date(contract.signed_at).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-body">
            A copy was emailed to {contract.signer_email}.
          </p>
        </div>
      ) : (
        <SignForm
          bookingId={bookingId}
          defaultName={booking.clients?.name ?? ""}
          defaultEmail={booking.clients?.email ?? ""}
        />
      )}
    </div>
  );
}
