import { AtSign, Globe, Send } from "lucide-react";
import { getTeamMembers } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function TeamPage() {
  const team: Array<{
    id: string;
    name: string;
    role: string;
    bio?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
  }> = await getTeamMembers();

  return (
    <section className="section-container py-14">
      <Badge>Core Members</Badge>
      <h1 className="heading mt-4 text-4xl font-semibold md:text-6xl">The Core Committee</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Card key={member.id} className="group overflow-hidden [perspective:1000px]">
            <CardContent className="relative min-h-64 transition duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <p className="heading text-2xl font-semibold">{member.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.12em] text-[var(--red)]">{member.role}</p>
                <p className="mt-3 text-sm text-black/70 dark:text-white/70">Hover to reveal links</p>
              </div>
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <p className="text-sm text-black/70 dark:text-white/70">
                  {member.bio || "Building meaningful cross-cultural narratives."}
                </p>
                <div className="mt-4 flex gap-2">
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noreferrer" className="rounded-full border p-2">
                      <AtSign className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="rounded-full border p-2">
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noreferrer" className="rounded-full border p-2">
                      <Send className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
