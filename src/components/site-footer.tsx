import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[#D30C1C] text-white">
      <div className="section-container py-14">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
          <div className="flex gap-3">
            <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/25">
              <Image src="/sla-vit-logo.png" alt="SLA VIT logo" fill sizes="48px" className="object-cover" />
            </span>
            <div>
              <p className="font-serif text-lg font-bold leading-snug md:text-xl">Spanish Literary Association</p>
              <p className="mt-2 font-sans text-sm text-white/95">Habla | Baila | Celebra</p>
            </div>
          </div>

          <div className="flex flex-col md:items-center">
            <p className="font-serif text-lg font-bold md:text-xl">Follow Us</p>
            <div className="mt-4 space-y-3 font-sans text-sm">
              <a
                href="https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA=="
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-white transition hover:text-white/85"
              >
                <FaInstagram className="h-5 w-5 shrink-0" aria-hidden />
                <span>@vit_sla</span>
              </a>
              <a
                href="https://www.linkedin.com/company/sla-vit"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-white transition hover:text-white/85"
              >
                <FaLinkedin className="h-5 w-5 shrink-0" aria-hidden />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="md:text-right">
            <p className="font-serif text-lg font-bold md:text-xl">Quick Links</p>
            <nav className="mt-4 flex flex-col gap-2 font-sans text-sm md:items-end">
              <Link href="/stories" className="w-fit transition hover:text-white/80">
                Stories
              </Link>
              <Link href="/blogs" className="w-fit transition hover:text-white/80">
                Blog
              </Link>
              <Link href="/team" className="w-fit transition hover:text-white/80">
                About Us
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="section-container flex flex-col gap-3 py-6 font-sans text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Spanish Literary Association, VIT Vellore</p>
          <Link href="/admin/login" className="w-fit transition hover:text-white/90">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
