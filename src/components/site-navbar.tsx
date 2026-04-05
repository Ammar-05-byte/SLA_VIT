"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/stories", label: "Stories" },
  { href: "/did-you-know", label: "Did You Know?" },
  { href: "/materials", label: "Materials" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [logoMissing, setLogoMissing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-3 z-50 px-3">
        <div className="section-container glass flex items-center gap-2 rounded-2xl px-3 py-2.5 md:gap-3 md:px-5 md:py-3">
          <Link href="/" className="group flex shrink-0 items-center gap-2">
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
            <span className="heading text-sm font-semibold uppercase tracking-[0.18em] transition group-hover:text-[var(--red)] max-[360px]:text-xs">
              SLAVIT
            </span>
          </Link>

          <nav className="hidden min-h-[2.25rem] min-w-0 flex-1 flex-wrap content-center items-center justify-center gap-x-0.5 gap-y-1 md:flex lg:gap-x-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-2 py-1.5 text-center text-[10px] font-medium leading-tight transition sm:px-2.5 sm:text-[11px] md:px-3 md:text-xs lg:px-3.5 lg:text-sm",
                    active
                      ? "bg-[var(--red)] text-white"
                      : "text-foreground/80 hover:bg-foreground/10",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/admin"
              className="hidden rounded-full border border-black/15 px-3 py-2 text-xs uppercase tracking-[0.12em] dark:border-white/15 md:inline-flex"
            >
              Admin
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 md:hidden"
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/45 transition-opacity md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
      >
        <aside
          className={cn(
            "absolute right-0 top-0 h-full w-[82%] max-w-[320px] bg-[var(--bg)] p-5 shadow-2xl transition-transform",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <p className="heading mb-4 text-lg font-semibold">Navigation</p>
          <nav className="space-y-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm",
                    active ? "bg-[var(--red)] text-white" : "hover:bg-black/8",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="mt-3 block rounded-xl border border-black/15 px-3 py-2 text-sm uppercase tracking-[0.12em]"
            >
              Admin
            </Link>
          </nav>
        </aside>
      </div>
    </>
  );
}
