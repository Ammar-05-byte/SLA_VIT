import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AboutSla() {
  return (
    <section id="about" className="scroll-mt-24 py-20">
      <div className="section-container mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl font-bold text-neutral-950 md:text-4xl">About SLA</h2>
        <p className="mt-6 text-base leading-relaxed text-neutral-700 md:text-lg">
          The Spanish Student Club &amp; Literary Association of VIT Vellore, a vibrant hub within the School of Social
          Sciences and Languages, fosters a deep appreciation for the Spanish language and its rich cultural tapestry.
          We cultivate fluency, explore literary masterpieces, and celebrate the diverse nuances of Hispanic culture.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/team"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "inline-flex gap-2")}
          >
            Learn More About Us <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-neutral-900/20 bg-white/40 text-neutral-900 hover:bg-white/70 dark:border-white/25 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
            )}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
