import { createServerSupabaseClient } from "@/lib/supabase/server-auth";

export default async function AdminClientsPage() {
  const supabase = await createServerSupabaseClient();
  const [{ data: clients }, { data: noShowCounts }] = await Promise.all([
    supabase.from("clients").select("*").order("created_at", { ascending: false }),
    supabase.from("client_no_show_counts").select("*"),
  ]);

  const noShowByClient = new Map((noShowCounts ?? []).map((r) => [r.client_id, r.no_show_count]));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl">Clients</h1>
      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-heading">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Client since</th>
              <th className="px-4 py-3">No-shows</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((c) => {
              const noShows = noShowByClient.get(c.id) ?? 0;
              return (
                <tr key={c.id} className="border-t border-border-soft">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.phone ?? "—"}</td>
                  <td className="px-4 py-3">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={noShows >= 2 ? "font-semibold text-red-700" : ""}>
                      {noShows}
                      {noShows >= 2 ? " — blocked from rebooking" : ""}
                    </span>
                  </td>
                </tr>
              );
            })}
            {clients?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-body">
                  No clients yet — they&apos;re created automatically from bookings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
