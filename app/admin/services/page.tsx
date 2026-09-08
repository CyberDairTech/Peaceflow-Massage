import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import ServiceRow from "./ServiceRow";
import NewServiceForm from "./NewServiceForm";

export default async function AdminServicesPage() {
  const supabase = await createServerSupabaseClient();
  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("duration_minutes", { ascending: true });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl">Services</h1>
        <NewServiceForm />
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-700">Couldn&apos;t load services: {error.message}</p>
      )}

      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-heading">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((s) => (
              <ServiceRow key={s.id} service={s} />
            ))}
            {services?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-body">
                  No services yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-body">
        Deactivated services stop showing on the public site but stay here for reference.
      </p>
    </div>
  );
}
