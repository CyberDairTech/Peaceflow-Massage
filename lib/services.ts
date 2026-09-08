import { createPublicSupabaseClient } from "@/lib/supabase/public";

export type Service = {
  slug: string;
  name: string;
  groupName: string;
  durationMinutes: number;
  price: number;
  description: string | null;
};

export type ServiceGroup = {
  groupName: string;
  services: Service[];
};

type ServiceRow = {
  slug: string;
  name: string;
  group_name: string | null;
  group_sort: number;
  duration_minutes: number;
  price_cents: number;
  description: string | null;
};

function mapRow(row: ServiceRow): Service {
  return {
    slug: row.slug,
    name: row.name,
    groupName: row.group_name ?? row.name,
    durationMinutes: row.duration_minutes,
    price: row.price_cents / 100,
    description: row.description,
  };
}

const SELECT_COLUMNS = "slug,name,group_name,group_sort,duration_minutes,price_cents,description";

export async function getActiveServices(): Promise<Service[]> {
  const supabase = createPublicSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select(SELECT_COLUMNS)
    .eq("active", true)
    .order("group_sort", { ascending: true })
    .order("duration_minutes", { ascending: true });

  return (data as ServiceRow[] | null)?.map(mapRow) ?? [];
}

export async function getActiveServiceGroups(): Promise<ServiceGroup[]> {
  const services = await getActiveServices();
  const groups: ServiceGroup[] = [];

  for (const service of services) {
    const existing = groups.find((g) => g.groupName === service.groupName);
    if (existing) {
      existing.services.push(service);
    } else {
      groups.push({ groupName: service.groupName, services: [service] });
    }
  }

  return groups;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = createPublicSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  return data ? mapRow(data as ServiceRow) : null;
}
