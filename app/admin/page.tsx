import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import { services } from "@/lib/site-data";
import StatusSelect from "./StatusSelect";

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();
  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl">Inquiries &amp; booking requests</h1>

      {error && (
        <p className="mt-4 text-sm text-red-700">
          Couldn&apos;t load inquiries: {error.message}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-heading">
            <tr>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Preferred</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries?.map((inquiry) => {
              const service = services.find((s) => s.slug === inquiry.service_slug);
              return (
                <tr key={inquiry.id} className="border-t border-border-soft align-top">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(inquiry.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{inquiry.name}</td>
                  <td className="px-4 py-3">
                    <div>{inquiry.email}</div>
                    {inquiry.phone && <div className="text-body">{inquiry.phone}</div>}
                  </td>
                  <td className="px-4 py-3">{service?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    {inquiry.preferred_date ?? ""} {inquiry.preferred_time ?? ""}
                  </td>
                  <td className="px-4 py-3 max-w-xs">{inquiry.message}</td>
                  <td className="px-4 py-3">
                    <StatusSelect id={inquiry.id} status={inquiry.status} />
                  </td>
                </tr>
              );
            })}
            {inquiries?.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-body">
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
