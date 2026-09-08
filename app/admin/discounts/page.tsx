import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import DiscountsClient from "./DiscountsClient";

export default async function AdminDiscountsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: codes } = await supabase
    .from("discount_codes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <DiscountsClient codes={codes ?? []} />
    </div>
  );
}
