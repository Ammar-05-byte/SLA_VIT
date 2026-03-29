import { prisma } from "@/lib/prisma";
import { mockBlogs, mockEvents, mockMaterials, mockTeam } from "@/lib/mock-data";

export async function getBlogs() {
  if (!process.env.DATABASE_URL) return mockBlogs;
  try {
    return await prisma.blog.findMany({ orderBy: { publishedAt: "desc" } });
  } catch {
    return mockBlogs;
  }
}

export async function getBlogBySlug(slug: string) {
  if (!process.env.DATABASE_URL) return mockBlogs.find((item) => item.slug === slug) ?? null;
  try {
    return await prisma.blog.findUnique({ where: { slug } });
  } catch {
    return mockBlogs.find((item) => item.slug === slug) ?? null;
  }
}

export async function getEvents() {
  if (!process.env.DATABASE_URL) return mockEvents;
  try {
    return await prisma.event.findMany({ orderBy: { startsAt: "asc" } });
  } catch {
    return mockEvents;
  }
}

export async function getMaterials() {
  if (!process.env.DATABASE_URL) return mockMaterials;
  try {
    return await prisma.material.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return mockMaterials;
  }
}

export async function getTeamMembers() {
  if (!process.env.DATABASE_URL) return mockTeam;
  try {
    return await prisma.teamMember.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    return mockTeam;
  }
}

export async function getDashboardStats() {
  if (!process.env.DATABASE_URL) {
    return {
      blogs: mockBlogs.length,
      events: mockEvents.length,
      materials: mockMaterials.length,
      team: mockTeam.length,
      messages: 0,
    };
  }

  try {
    const [blogs, events, materials, team, messages] = await Promise.all([
      prisma.blog.count(),
      prisma.event.count(),
      prisma.material.count(),
      prisma.teamMember.count(),
      prisma.contactMessage.count(),
    ]);

    return { blogs, events, materials, team, messages };
  } catch {
    return {
      blogs: mockBlogs.length,
      events: mockEvents.length,
      materials: mockMaterials.length,
      team: mockTeam.length,
      messages: 0,
    };
  }
}
