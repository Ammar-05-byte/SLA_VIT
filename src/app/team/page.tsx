import { AtSign, Globe, Send } from "lucide-react";
import Image from "next/image";
import { getTeamMembers } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function TeamPage() {
  const team: Array<{
    id: string;
    name: string;
    role: string;
    bio?: string | null;
    image?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
  }> = await getTeamMembers();

  return (
    <section className="section-container page-section">
      <Badge>Core Members</Badge>
      <h1 className="page-title mt-4">The Core Committee</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Card key={member.id} className="group overflow-hidden perspective-[1000px]">
            <CardContent className="relative min-h-96 transition duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">
              <div className="absolute inset-0 backface-hidden">
                <div className="relative mb-4 h-44 overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">
                      No photo
                    </div>
                  )}
                </div>
                <p className="heading text-xl font-semibold sm:text-2xl">{member.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.12em] text-(--red)">{member.role}</p>
                <p className="mt-3 text-sm text-black/70 dark:text-white/70">Hover to reveal links</p>
              </div>
              <div className="absolute inset-0 transform-[rotateY(180deg)] backface-hidden">
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
