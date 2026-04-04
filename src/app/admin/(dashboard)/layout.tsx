import { Merriweather } from "next/font/google";
import { requireAdmin } from "@/lib/admin-guard";
import { AdminShellSidebar } from "@/components/admin/admin-shell-sidebar";

const adminSerif = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-admin-serif",
});

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { admin } = await requireAdmin();

  return (
    <div
      className={`${adminSerif.variable} flex min-h-screen w-full bg-[#FDF6E9] text-neutral-900`}
      style={{ colorScheme: "light" }}
    >
      <AdminShellSidebar admin={admin} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto bg-[#FDF6E9]">
        <div className="flex-1 p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
