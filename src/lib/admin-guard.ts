import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isUserInAdminsTable } from "@/lib/supabase/admin";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  const isAdmin = await isUserInAdminsTable(supabase, user.id);
  if (!isAdmin) {
    redirect("/admin/login?error=not_admin");
  }

  const { data: admin } = await supabase.from("admins").select("id,name,email,role").eq("id", user.id).single();

  return {
    user,
    admin: admin ?? { id: user.id, name: user.email ?? "Admin", email: user.email ?? "", role: "admin" },
  };
}
