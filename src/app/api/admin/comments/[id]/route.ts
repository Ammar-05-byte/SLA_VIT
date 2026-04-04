import { NextResponse } from "next/server";
import { ensureAdmin } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const ok = await ensureAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const service = createServiceClient();
  const db = service ?? (await createClient());
  const { error } = await db.from("comments").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
