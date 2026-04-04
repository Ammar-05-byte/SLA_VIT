import { createClient } from "@/lib/supabase/server";
import { isUserInAdminsTable } from "@/lib/supabase/admin";

export async function ensureAdmin() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return false;
    return isUserInAdminsTable(supabase, user.id);
  } catch {
    return false;
  }
}
