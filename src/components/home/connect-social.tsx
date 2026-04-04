import { FaInstagram, FaLinkedin } from "react-icons/fa6";

export function ConnectSocial() {
  return (
    <div className="w-full">
      <section className="bg-[var(--red)] px-4 py-14 text-white md:py-20">
        <div className="section-container mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Connect With Us</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
            Follow us on social media to stay updated on our latest events, stories, and cultural explorations.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA=="
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-white/18 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/26"
            >
              <FaInstagram className="h-5 w-5 shrink-0" aria-hidden />
              @vit_sla
            </a>
            <a
              href="https://www.linkedin.com/company/sla-vit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-white/18 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/26"
            >
              <FaLinkedin className="h-5 w-5 shrink-0" aria-hidden />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="border-y-[3px] border-[var(--red)] bg-[var(--bg)] px-4 py-10 md:py-12">
        <div className="section-container text-center">
          <p className="font-serif text-2xl font-bold tracking-tight text-[var(--red)] md:text-3xl lg:text-4xl">
            Habla | Baila | Celebra
          </p>
          <p className="mt-3 font-sans text-sm font-normal tracking-wide text-[#7a7168] dark:text-[#b5aaa0] md:mt-4 md:text-base">
            Speak | Dance | Celebrate
          </p>
        </div>
      </section>
    </div>
  );
}
