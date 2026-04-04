import { NextResponse } from "next/server";
import { ensureAdmin } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const ok = await ensureAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No session" }, { status: 401 });

  const { data: row } = await supabase.from("admins").select("email,name,role").eq("id", user.id).maybeSingle();

  return NextResponse.json({
    email: user.email ?? row?.email ?? null,
    name: row?.name ?? null,
    role: row?.role ?? null,
  });
}
