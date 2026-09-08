import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server-auth";

async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

export async function POST(request: Request) {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { clientName, clientEmail, clientPhone, serviceId, startTime, amountPaid, discountCodeId } =
    await request.json();

  if (!clientName || !clientEmail || !serviceId || !startTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("duration_minutes")
    .eq("id", serviceId)
    .single();

  if (serviceError || !service) {
    return NextResponse.json({ error: "Service not found" }, { status: 400 });
  }

  let clientId: string;
  const { data: existingClient } = await supabase
    .from("clients")
    .select("id")
    .ilike("email", clientEmail)
    .maybeSingle();

  if (existingClient) {
    clientId = existingClient.id;
  } else {
    const { data: newClient, error: clientError } = await supabase
      .from("clients")
      .insert({ name: clientName, email: clientEmail, phone: clientPhone || null })
      .select("id")
      .single();
    if (clientError || !newClient) {
      return NextResponse.json({ error: clientError?.message ?? "Could not create client" }, { status: 500 });
    }
    clientId = newClient.id;
  }

  const start = new Date(startTime);
  // +10 min buffer per the service-duration mismatch fix noted in the project scope doc.
  const end = new Date(start.getTime() + (service.duration_minutes + 10) * 60_000);

  const { error: bookingError } = await supabase.from("bookings").insert({
    client_id: clientId,
    service_id: serviceId,
    discount_code_id: discountCodeId || null,
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    status: "confirmed",
    amount_paid_cents: amountPaid ? Math.round(amountPaid * 100) : null,
  });

  if (bookingError) return NextResponse.json({ error: bookingError.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id, status } = await request.json();
  if (!id || !status) return NextResponse.json({ error: "id and status are required" }, { status: 400 });

  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
