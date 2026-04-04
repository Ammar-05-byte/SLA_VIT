import { NextResponse } from "next/server";
import { ensureAdmin } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const ok = await ensureAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("comments")
      .select("id, post_id, commenter_name, content, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data ?? []);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load comments";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
