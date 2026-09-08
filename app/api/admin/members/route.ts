import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server-auth";

async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

type Deliverable = { serviceId: string; quantity: number };

async function computeMonthlyPrice(
  supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>,
  deliverables: Deliverable[],
  discountPercent: number,
) {
  if (deliverables.length === 0) return 0;
  const { data: services } = await supabase
    .from("services")
    .select("id,price_cents")
    .in(
      "id",
      deliverables.map((d) => d.serviceId),
    );

  const priceById = new Map((services ?? []).map((s) => [s.id, s.price_cents]));
  const normalTotal = deliverables.reduce(
    (sum, d) => sum + (priceById.get(d.serviceId) ?? 0) * d.quantity,
    0,
  );
  return Math.round(normalTotal * (1 - discountPercent / 100));
}

export async function POST(request: Request) {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const {
    clientName,
    clientEmail,
    clientPhone,
    deliverables,
    discountPercent,
    cardLast4,
    cardExpMonth,
    cardExpYear,
    cardName,
  } = await request.json();

  if (!clientName || !clientEmail || !Array.isArray(deliverables) || deliverables.length === 0) {
    return NextResponse.json(
      { error: "Client name, email, and at least one deliverable are required" },
      { status: 400 },
    );
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

  const discount = discountPercent ?? 15;
  const monthlyPriceCents = await computeMonthlyPrice(supabase, deliverables, discount);

  const { data: member, error: memberError } = await supabase
    .from("members")
    .insert({
      client_id: clientId,
      discount_percent: discount,
      monthly_price_cents: monthlyPriceCents,
      card_last4: cardLast4 || null,
      card_exp_month: cardExpMonth || null,
      card_exp_year: cardExpYear || null,
      card_name: cardName || null,
    })
    .select("id")
    .single();

  if (memberError || !member) {
    return NextResponse.json({ error: memberError?.message ?? "Could not create member" }, { status: 500 });
  }

  const { error: deliverablesError } = await supabase.from("member_services").insert(
    deliverables.map((d: Deliverable) => ({
      member_id: member.id,
      service_id: d.serviceId,
      quantity_per_month: d.quantity,
    })),
  );

  if (deliverablesError) {
    return NextResponse.json({ error: deliverablesError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: member.id });
}

export async function PATCH(request: Request) {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id, status, deliverables, discountPercent, cardLast4, cardExpMonth, cardExpYear, cardName } =
    await request.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (status !== undefined) update.status = status;
  if (cardLast4 !== undefined) update.card_last4 = cardLast4 || null;
  if (cardExpMonth !== undefined) update.card_exp_month = cardExpMonth || null;
  if (cardExpYear !== undefined) update.card_exp_year = cardExpYear || null;
  if (cardName !== undefined) update.card_name = cardName || null;

  if (Array.isArray(deliverables)) {
    const discount =
      discountPercent ?? (await supabase.from("members").select("discount_percent").eq("id", id).single()).data
        ?.discount_percent ?? 15;
    update.discount_percent = discount;
    update.monthly_price_cents = await computeMonthlyPrice(supabase, deliverables, discount);

    await supabase.from("member_services").delete().eq("member_id", id);
    if (deliverables.length > 0) {
      await supabase.from("member_services").insert(
        deliverables.map((d: Deliverable) => ({
          member_id: id,
          service_id: d.serviceId,
          quantity_per_month: d.quantity,
        })),
      );
    }
  } else if (discountPercent !== undefined) {
    update.discount_percent = discountPercent;
  }

  const { error } = await supabase.from("members").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
