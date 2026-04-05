import { PrismaClient } from "@prisma/client";
import { mockTeam } from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.teamMember.deleteMany();
  await prisma.teamMember.createMany({
    data: mockTeam.map((m) => ({
      name: m.name,
      role: m.role,
      bio: null,
      image: m.image,
      instagram: m.instagram ?? null,
      linkedin: m.linkedin ?? null,
      twitter: null,
    })),
  });
}

main()
  .then(() => {
    console.info(`Seeded ${mockTeam.length} team members.`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
