import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import BlockedDatesClient from "./BlockedDatesClient";

export default async function AdminBlockedDatesPage() {
  const supabase = await createServerSupabaseClient();
  const { data: slots } = await supabase
    .from("blocked_slots")
    .select("*")
    .order("start_time", { ascending: true });

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <BlockedDatesClient slots={slots ?? []} />
    </div>
  );
}
