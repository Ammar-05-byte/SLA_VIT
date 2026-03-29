import { requireAdmin } from "@/lib/admin-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SignOutButton } from "@/components/admin/sign-out-button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <section className="section-container py-10">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="heading text-3xl font-semibold">Admin Dashboard</h1>
        <SignOutButton />
      </div>
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <AdminSidebar />
        <div>{children}</div>
      </div>
    </section>
  );
}
