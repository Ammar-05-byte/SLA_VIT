"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

const topics = [
  {
    title: "Language",
    text: "Discover idioms, expressions, and rhythm through interactive sessions.",
  },
  {
    title: "Literature",
    text: "Travel from Golden Age classics to contemporary Spanish voices.",
  },
  {
    title: "Music",
    text: "Experience flamenco roots and modern soundscapes in guided events.",
  },
  {
    title: "Food",
    text: "Explore culinary stories as an entry point to Spanish regional identity.",
  },
];

export function CultureImmersion() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-mask > *",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 70%",
          },
        },
      );

      gsap.to(".culture-visual", {
        scale: 1.08,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="culture" ref={wrapRef} className="section-container py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Badge>Culture Immersion</Badge>
          <div className="reveal-mask mt-5">
            <h2 className="heading text-3xl font-semibold md:text-5xl">Feel Spain Through Stories, Sound, and Symbol</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {topics.map((topic) => (
              <motion.div
                whileHover={{ x: 4 }}
                key={topic.title}
                className="glass rounded-xl p-4 transition hover:border-[var(--red)]/35"
              >
                <p className="heading text-lg font-semibold">{topic.title}</p>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">{topic.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            className="culture-visual h-[560px] w-full object-cover"
            src="https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1300&q=80"
            alt="Spanish culture"
            width={900}
            height={1100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
