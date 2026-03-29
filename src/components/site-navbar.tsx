"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/materials", label: "Materials" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [logoMissing, setLogoMissing] = useState(false);

  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="section-container glass flex items-center justify-between rounded-2xl px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-black/10 dark:border-white/20">
            {!logoMissing ? (
              <Image
                src="/sla-vit-logo.png"
                alt="SLA VIT logo"
                fill
                sizes="36px"
                className="object-cover"
                onError={() => setLogoMissing(true)}
              />
            ) : (
              <span className="heading text-xs font-bold tracking-[0.2em] text-[var(--red)]">SLA</span>
            )}
          </span>
          <span className="heading text-sm font-semibold uppercase tracking-[0.18em] transition group-hover:text-[var(--red)]">
            SLAVIT
          </span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition",
                  active
                    ? "bg-[var(--red)] text-white"
                    : "text-black/75 hover:bg-black/8 dark:text-white/75 dark:hover:bg-white/10",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="rounded-full border border-black/15 px-3 py-2 text-xs uppercase tracking-[0.12em] dark:border-white/15"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
