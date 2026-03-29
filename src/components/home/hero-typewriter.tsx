"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const words = ["Spanish Literary Association", "Asociacion Literaria Espanola"];

export function HeroTypewriter() {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const currentWord = useMemo(() => words[index % words.length], [index]);

  useEffect(() => {
    const doneTyping = display === currentWord;
    const empty = display.length === 0;
    const speed = deleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!deleting && doneTyping) {
        setTimeout(() => setDeleting(true), 900);
        return;
      }

      if (deleting && empty) {
        setDeleting(false);
        setIndex((prev) => prev + 1);
        return;
      }

      setDisplay((prev) =>
        deleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1),
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [currentWord, deleting, display]);

  return (
    <section className="relative min-h-[84vh] overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(198,11,30,0.28),transparent_45%),radial-gradient(circle_at_80%_40%,rgba(255,196,0,0.34),transparent_48%),linear-gradient(180deg,rgba(255,248,231,0.3),rgba(255,248,231,0.95))] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(198,11,30,0.28),transparent_45%),radial-gradient(circle_at_80%_40%,rgba(255,196,0,0.26),transparent_48%),linear-gradient(180deg,rgba(12,12,12,0.5),rgba(12,12,12,0.95))]" />
      <div className="section-container flex min-h-[80vh] flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs uppercase tracking-[0.24em] text-black/65 dark:text-white/65"
        >
          Official Cultural Chapter | VIT Vellore
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="heading max-w-full text-[clamp(1.95rem,6vw,4.5rem)] font-semibold leading-tight"
        >
          <span className="text-gradient whitespace-nowrap">{display}</span>
          <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-current align-middle" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-black/72 dark:text-white/72"
        >
          A cinematic journey into language, literature, music, and cultural expression. This is not just a website,
          it is an experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link href="#culture">
            <Button size="lg">Explore the Culture</Button>
          </Link>
          <Link href="/events">
            <Button variant="outline" size="lg">
              View Events
            </Button>
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
          Scroll
          <span className="relative h-10 w-[1px] overflow-hidden bg-black/20 dark:bg-white/20">
            <span className="absolute left-0 top-0 h-4 w-full animate-bounce bg-[var(--red)]" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
