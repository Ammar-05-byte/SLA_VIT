import Link from "next/link";
import { FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

const social = [
  { href: "https://www.instagram.com/vit_sla/", label: "Instagram", icon: FaInstagram },
  {
    href: "https://www.linkedin.com/company/spanish-literary-association-vit/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  { href: "https://x.com", label: "X", icon: FaXTwitter },
  { href: "https://www.youtube.com", label: "YouTube", icon: FaYoutube },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-black text-white">
      <div className="section-container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="heading text-xl">Spanish Literary Association</p>
          <p className="mt-2 text-sm text-white/65">VIT Vellore chapter for language, arts, and cultural expression.</p>
        </div>
        <div className="text-sm text-white/70">
          <p className="mb-3 font-semibold text-white">Quick Links</p>
          <div className="space-y-2">
            <Link className="block hover:text-[var(--yellow)]" href="/blogs">
              Blogs
            </Link>
            <Link className="block hover:text-[var(--yellow)]" href="/events">
              Events
            </Link>
            <Link className="block hover:text-[var(--yellow)]" href="/materials">
              Materials
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Follow</p>
          <div className="flex gap-3">
            {social.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 p-2 transition hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
                  aria-label={item.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
