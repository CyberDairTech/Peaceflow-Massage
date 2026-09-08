import { createPublicSupabaseClient } from "@/lib/supabase/public";

export type Service = {
  slug: string;
  name: string;
  durationMinutes: number;
  price: number;
  description: string | null;
};

type ServiceRow = {
  slug: string;
  name: string;
  duration_minutes: number;
  price_cents: number;
  description: string | null;
};

function mapRow(row: ServiceRow): Service {
  return {
    slug: row.slug,
    name: row.name,
    durationMinutes: row.duration_minutes,
    price: row.price_cents / 100,
    description: row.description,
  };
}

export async function getActiveServices(): Promise<Service[]> {
  const supabase = createPublicSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select("slug,name,duration_minutes,price_cents,description")
    .eq("active", true)
    .order("duration_minutes", { ascending: true });

  return (data as ServiceRow[] | null)?.map(mapRow) ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = createPublicSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select("slug,name,duration_minutes,price_cents,description")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  return data ? mapRow(data as ServiceRow) : null;
}
