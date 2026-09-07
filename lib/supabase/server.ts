import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client — server-only. Never import this from a Client Component
// or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase server environment variables are not set.");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
