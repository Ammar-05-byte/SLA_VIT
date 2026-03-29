"use client";

import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface EventItem {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  startsAt: string | Date;
}

export function EventsShowcase({ events }: { events: EventItem[] }) {
  return (
    <section className="py-20">
      <div className="section-container">
        <h2 className="heading mb-8 text-3xl font-semibold md:text-5xl">Upcoming Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <motion.article
              whileHover={{ scale: 1.02, y: -4 }}
              key={event.id}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={event.image || "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80"}
                alt={event.title}
                width={1200}
                height={800}
                className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                  {format(new Date(event.startsAt), "dd MMM yyyy")}
                </p>
                <p className="heading mt-1 text-xl">{event.title}</p>
                <p className="mt-2 line-clamp-2 text-sm text-white/78">{event.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
