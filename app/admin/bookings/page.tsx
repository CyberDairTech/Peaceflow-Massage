import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import NewBookingForm from "./NewBookingForm";
import BookingStatusActions from "./BookingStatusActions";

export default async function AdminBookingsPage() {
  const supabase = await createServerSupabaseClient();

  const [{ data: bookings, error }, { data: services }, { data: discountCodes }] = await Promise.all([
    supabase
      .from("bookings")
      .select("*, clients(name,email,phone), services(name), contracts(id)")
      .order("start_time", { ascending: false }),
    supabase.from("services").select("id,name,duration_minutes").eq("active", true),
    supabase.from("discount_codes").select("id,code").eq("active", true),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl">Bookings</h1>
        <NewBookingForm services={services ?? []} discountCodes={discountCodes ?? []} />
      </div>

      {error && <p className="mt-4 text-sm text-red-700">Couldn&apos;t load bookings: {error.message}</p>}

      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-heading">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => {
              const contract = Array.isArray(b.contracts) ? b.contracts[0] : b.contracts;
              return (
                <tr key={b.id} className="border-t border-border-soft align-top">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(b.start_time).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div>{b.clients?.name}</div>
                    <div className="text-body">{b.clients?.email}</div>
                  </td>
                  <td className="px-4 py-3">{b.services?.name}</td>
                  <td className="px-4 py-3">
                    {b.amount_paid_cents != null ? `$${(b.amount_paid_cents / 100).toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <BookingStatusActions id={b.id} status={b.status} hasContract={!!contract} />
                  </td>
                </tr>
              );
            })}
            {bookings?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-body">
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
