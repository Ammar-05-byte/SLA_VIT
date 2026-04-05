import { format } from "date-fns";
import Image from "next/image";
import { getEvents } from "@/lib/data";

export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function EventsPage() {
  const events: Array<{
    id: string;
    title: string;
    description: string;
    image?: string | null;
    startsAt: string | Date;
  }> = await getEvents();

  return (
    <section className="section-container page-section">
      <Badge>Calendar</Badge>
      <h1 className="page-title mt-4">Events and Experiences</h1>
      <div className="mt-10 space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="grid items-stretch md:grid-cols-[280px_1fr]">
              <Image
                src={event.image || "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80"}
                alt={event.title}
                width={900}
                height={600}
                className="h-full min-h-56 w-full object-cover"
              />
              <CardContent>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--red)]">
                  {format(new Date(event.startsAt), "dd MMM yyyy, hh:mm a")}
                </p>
                <h2 className="heading mt-2 text-2xl font-semibold">{event.title}</h2>
                <p className="mt-2 text-neutral-700">{event.description}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="heading mb-4 text-xl font-semibold sm:text-2xl md:text-4xl">Interactive Timeline</h2>
        <div className="relative ml-2 border-l border-black/20 pl-8 dark:border-white/20">
          {events.map((event) => (
            <div key={`${event.id}-timeline`} className="relative mb-8">
              <span className="absolute -left-[42px] top-1 h-3 w-3 rounded-full bg-[var(--red)]" />
              <p className="text-sm text-neutral-600">{format(new Date(event.startsAt), "MMM yyyy")}</p>
              <p className="heading text-xl">{event.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
