import { CultureImmersion } from "@/components/home/culture-immersion";
import { EventsShowcase } from "@/components/home/events-showcase";
import { HeroTypewriter } from "@/components/home/hero-typewriter";
import { WordOfDay } from "@/components/home/word-of-day";
import { getEvents, getTeamMembers } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const [events, team] = await Promise.all([getEvents(), getTeamMembers()]);

  return (
    <div>
      <HeroTypewriter />
      <CultureImmersion />
      <EventsShowcase events={events as never[]} />

      <section className="section-container py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Badge>Core Committee</Badge>
            <h2 className="heading mt-3 text-3xl font-semibold md:text-5xl">People Behind the Movement</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {(team as Array<{ id: string; name: string; role: string; bio?: string | null }>).slice(0, 2).map((member) => (
            <Card key={member.id} className="group overflow-hidden transition hover:shadow-[0_18px_42px_rgba(198,11,30,0.18)]">
              <CardContent>
                <p className="heading text-2xl font-semibold">{member.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.14em] text-[var(--red)]">{member.role}</p>
                <p className="mt-3 text-black/70 dark:text-white/70">{member.bio || "Leading with creativity and cultural pride."}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <WordOfDay />
    </div>
  );
}

