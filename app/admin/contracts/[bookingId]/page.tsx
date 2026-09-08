import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import { contractTitle, cancellationNoShowPolicy, contractAcknowledgement } from "@/lib/contract";
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
      <h1 className="text-3xl">{contractTitle}</h1>
      <p className="mt-2 text-sm text-body">
        {booking.clients?.name} · {booking.services?.name} ·{" "}
        {new Date(booking.start_time).toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-body">
        {booking.amount_paid_cents != null
          ? `Receipt: $${(booking.amount_paid_cents / 100).toFixed(2)} paid`
          : "Receipt: amount not recorded"}
      </p>

      <div className="relative mt-6 space-y-3 rounded-sm border border-border bg-linen/40 p-6 pb-10 text-sm text-body">
        <p className="font-semibold text-heading">Cancellation &amp; No-Show Policy</p>
        {cancellationNoShowPolicy.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p
          className="wordmark absolute bottom-3 right-6 text-lg text-heading"
          style={{ fontStyle: "italic" }}
        >
          {contract?.initials ? `Initialed: ${contract.initials}` : "Initials: ______"}
        </p>
      </div>

      <p className="mt-4 text-xs text-body">{contractAcknowledgement}</p>

      {contract?.signed_at ? (
        <div className="mt-6 rounded-sm border border-gold bg-surface p-6">
          <p className="font-semibold text-heading">Signed</p>
          <p
            className="wordmark mt-3 text-2xl text-heading"
            style={{ fontStyle: "italic" }}
          >
            {contract.signer_name}
          </p>
          <p className="mt-2 text-sm text-body">
            {contract.signer_name} — {new Date(contract.signed_at).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-body">A copy was emailed to {contract.signer_email}.</p>
          <a
            href={`/api/admin/contracts/${bookingId}/pdf`}
            className="btn btn-line mt-4 inline-flex"
          >
            Download PDF
          </a>
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
