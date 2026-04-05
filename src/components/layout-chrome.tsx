"use client";

import { usePathname } from "next/navigation";
import { ScrollSmoothProvider } from "@/components/scroll-smooth-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { PageTransition } from "@/components/page-transition";

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const adminShell = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (adminShell) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollSmoothProvider />
      <SiteNavbar />
      <main className="min-w-0 flex-1 overflow-x-hidden pb-10 pt-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
    </>
  );
}
