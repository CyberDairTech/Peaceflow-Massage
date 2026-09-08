import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import NewClientForm from "./NewClientForm";
import ClientRow from "./ClientRow";

export default async function AdminClientsPage() {
  const supabase = await createServerSupabaseClient();
  const [{ data: clients, error }, { data: noShowCounts }] = await Promise.all([
    supabase.from("clients").select("*").order("created_at", { ascending: false }),
    supabase.from("client_no_show_counts").select("*"),
  ]);

  const noShowByClient = new Map((noShowCounts ?? []).map((r) => [r.client_id, r.no_show_count]));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl">Clients</h1>
        <NewClientForm />
      </div>

      {error && <p className="mt-4 text-sm text-red-700">Couldn&apos;t load clients: {error.message}</p>}

      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-heading">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Client since</th>
              <th className="px-4 py-3">No-shows</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((c) => (
              <ClientRow key={c.id} client={c} noShows={noShowByClient.get(c.id) ?? 0} />
            ))}
            {clients?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-body">
                  No clients yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
