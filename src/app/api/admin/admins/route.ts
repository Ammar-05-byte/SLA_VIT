import { NextResponse } from "next/server";
import { ensureAdmin } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const ok = await ensureAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("admins").select("id,email,name,role,created_at").order("created_at", {
      ascending: false,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data ?? []);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load admins";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
