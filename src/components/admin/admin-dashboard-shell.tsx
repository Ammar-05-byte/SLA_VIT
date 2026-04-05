"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AdminShellSidebar, type AdminProfile } from "@/components/admin/admin-shell-sidebar";
import { cn } from "@/lib/utils";

export function AdminDashboardShell({
  admin,
  children,
}: {
  admin: AdminProfile;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileNavOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileNavOpen]);

  return (
    <div className="flex min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#FDF6E9] text-neutral-900">
      <div
        role="presentation"
        className={cn(
          "fixed inset-0 z-40 bg-black/45 transition-opacity duration-200 md:hidden",
          mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileNavOpen(false)}
        aria-hidden
      />
      <AdminShellSidebar
        admin={admin}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden bg-[#FDF6E9]">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200/90 bg-[#FDF6E9]/95 px-4 backdrop-blur-sm md:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
            aria-expanded={mobileNavOpen}
            aria-controls="admin-sidebar-nav"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>
          <span className="min-w-0 truncate font-[family-name:var(--font-admin-serif),Georgia,serif] text-base font-semibold text-neutral-900">
            Admin
          </span>
        </header>
        <div className="min-w-0 flex-1 overflow-x-auto p-4 sm:p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
