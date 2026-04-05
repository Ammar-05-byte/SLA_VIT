import { AboutSla } from "@/components/home/about-sla";
import { EventsShowcase } from "@/components/home/events-showcase";
import { HeroTypewriter } from "@/components/home/hero-typewriter";
import { WordOfDay } from "@/components/home/word-of-day";
import { getEvents } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const events = await getEvents();

  return (
    <div>
      <HeroTypewriter />
      <AboutSla />
      <EventsShowcase events={events as never[]} />

      <WordOfDay />
    </div>
  );
}
