import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import NewMemberForm from "./NewMemberForm";
import MemberRow from "./MemberRow";

export default async function AdminMembershipPage() {
  const supabase = await createServerSupabaseClient();

  const [{ data: members, error }, { data: allDeliverables }, { data: services }] = await Promise.all([
    supabase
      .from("members")
      .select("*, clients(name,email,phone)")
      .eq("status", "active")
      .order("created_at", { ascending: false }),
    supabase.from("member_services").select("member_id,service_id,quantity_per_month"),
    supabase.from("services").select("id,name,group_name,price_cents").eq("active", true),
  ]);

  const serviceOptions = (services ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    groupName: s.group_name ?? s.name,
    price_cents: s.price_cents,
  }));

  const deliverablesByMember = new Map<string, { service_id: string; quantity_per_month: number }[]>();
  for (const d of allDeliverables ?? []) {
    const list = deliverablesByMember.get(d.member_id) ?? [];
    list.push(d);
    deliverablesByMember.set(d.member_id, list);
  }

  const totalMonthlyRevenue = (members ?? []).reduce((sum, m) => sum + m.monthly_price_cents, 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Membership</h1>
          <p className="mt-1 text-sm text-body">
            {members?.length ?? 0} active member{members?.length === 1 ? "" : "s"} · $
            {(totalMonthlyRevenue / 100).toFixed(2)}/mo total
          </p>
        </div>
        <NewMemberForm services={serviceOptions} />
      </div>

      {error && <p className="mt-4 text-sm text-red-700">Couldn&apos;t load members: {error.message}</p>}

      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-heading">
            <tr>
              <th className="px-4 py-3">Member</th>
              <th className="px-4 py-3">Deliverables</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Card on file</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members?.map((m) => (
              <MemberRow
                key={m.id}
                member={m}
                deliverables={deliverablesByMember.get(m.id) ?? []}
                services={serviceOptions}
              />
            ))}
            {members?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-body">
                  No members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-body">
        Automatic monthly billing via Stripe isn&apos;t connected yet —
        prices and card details here are for planning and reference until
        that&apos;s wired up.
      </p>
    </div>
  );
}
