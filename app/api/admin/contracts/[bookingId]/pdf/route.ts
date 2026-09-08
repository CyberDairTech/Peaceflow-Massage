import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(_request: Request, { params }: { params: Promise<{ bookingId: string }> }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { bookingId } = await params;
  const serviceClient = createServiceClient();
  const { data, error } = await serviceClient.storage.from("contracts").download(`${bookingId}.pdf`);

  if (error || !data) {
    return NextResponse.json({ error: "Contract PDF not found" }, { status: 404 });
  }

  const buffer = Buffer.from(await data.arrayBuffer());
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="peaceflow-agreement-${bookingId}.pdf"`,
    },
  });
}
