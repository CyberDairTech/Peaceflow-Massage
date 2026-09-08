import "server-only";
import { createClient } from "@supabase/supabase-js";

// Anon-key client for Server Components reading public data (active
// services, blocked-slot times) — respects RLS, no session needed.
export function createPublicSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}
