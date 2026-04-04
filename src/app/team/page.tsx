import { ConnectSocial } from "@/components/home/connect-social";
import { TeamMemberCard } from "@/components/team/team-member-card";
import { getTeamMembers } from "@/lib/data";
import { resolveTeamMemberPhoto } from "@/lib/team-photo";
import { Badge } from "@/components/ui/badge";

export default async function TeamPage() {
  const team: Array<{
    id: string;
    name: string;
    role: string;
    image?: string | null;
  }> = await getTeamMembers();

  return (
    <>
      <section className="section-container page-section">
        <Badge>Core Members</Badge>
        <h1 className="page-title mt-4 text-neutral-950">The Core Committee</h1>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {team.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              photoSrc={resolveTeamMemberPhoto(member)}
            />
          ))}
        </div>
      </section>

      <ConnectSocial />
    </>
  );
}
