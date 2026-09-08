import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server-auth";

export default async function AdminContractsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, clients(name,email), services(name), contracts(signed_at,signer_name,initials)")
    .order("start_time", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl">Contracts &amp; Receipts</h1>
      <p className="mt-2 text-sm text-body">
        Open a booking to have the client review and initial the agreement in
        person, or view what was already signed.
      </p>

      {error && <p className="mt-4 text-sm text-red-700">Couldn&apos;t load bookings: {error.message}</p>}

      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-heading">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Receipt</th>
              <th className="px-4 py-3">Contract</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => {
              const contract = Array.isArray(b.contracts) ? b.contracts[0] : b.contracts;
              return (
                <tr key={b.id} className="border-t border-border-soft">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(b.start_time).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{b.clients?.name}</td>
                  <td className="px-4 py-3">{b.services?.name}</td>
                  <td className="px-4 py-3">
                    {b.amount_paid_cents != null ? `$${(b.amount_paid_cents / 100).toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {contract?.signed_at ? (
                      <span className="text-accent">
                        Signed {new Date(contract.signed_at).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-body">Unsigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/contracts/${b.id}`} className="font-semibold text-accent hover:underline">
                      {contract?.signed_at ? "View" : "Sign"}
                    </Link>
                  </td>
                </tr>
              );
            })}
            {bookings?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-body">
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
