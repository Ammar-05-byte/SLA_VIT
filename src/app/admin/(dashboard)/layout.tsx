import { Merriweather } from "next/font/google";
import { requireAdmin } from "@/lib/admin-guard";
import { AdminDashboardShell } from "@/components/admin/admin-dashboard-shell";

const adminSerif = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-admin-serif",
});

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { admin } = await requireAdmin();

  return (
    <div className={`${adminSerif.variable} min-h-screen text-neutral-900`} style={{ colorScheme: "light" }}>
      <AdminDashboardShell admin={admin}>{children}</AdminDashboardShell>
    </div>
  );
}
