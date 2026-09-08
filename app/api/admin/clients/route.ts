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

  const { name, email, phone } = await request.json();
  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from("clients")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "A client with that email already exists." },
      { status: 409 },
    );
  }

  const { error } = await supabase.from("clients").insert({
    name,
    email,
    phone: phone || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id, name, email, phone } = await request.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const update: Record<string, unknown> = {};
  if (name !== undefined) update.name = name;
  if (email !== undefined) update.email = email;
  if (phone !== undefined) update.phone = phone || null;

  const { error } = await supabase.from("clients").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
