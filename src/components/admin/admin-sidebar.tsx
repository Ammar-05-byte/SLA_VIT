"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/materials", label: "Materials" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass h-fit rounded-2xl p-4">
      <p className="heading mb-4 text-lg">Dashboard</p>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm",
              pathname === link.href ? "bg-[var(--red)] text-white" : "hover:bg-black/5 dark:hover:bg-white/10",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
