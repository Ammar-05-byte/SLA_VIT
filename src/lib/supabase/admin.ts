import type { SupabaseClient } from "@supabase/supabase-js";

export async function isUserInAdminsTable(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase.from("admins").select("id").eq("id", userId).maybeSingle();
  return !!data;
}
