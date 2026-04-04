import { prisma } from "@/lib/prisma";
import {
  mockBlogs,
  mockDidYouKnow,
  mockEvents,
  mockMaterials,
  mockStories,
  mockTeam,
} from "@/lib/mock-data";

/** Shape used by `/did-you-know` (Prisma rows include extra fields; mock rows omit them). */
export type DidYouKnowListItem = {
  id: string;
  title: string;
  content: string;
  sourceUrl: string | null;
  sortOrder: number;
};

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

export async function getStories() {
  if (!process.env.DATABASE_URL) return mockStories;
  try {
    return await prisma.story.findMany({ orderBy: { publishedAt: "desc" } });
  } catch {
    return mockStories;
  }
}

export async function getStoryBySlug(slug: string) {
  if (!process.env.DATABASE_URL) return mockStories.find((item) => item.slug === slug) ?? null;
  try {
    return await prisma.story.findUnique({ where: { slug } });
  } catch {
    return mockStories.find((item) => item.slug === slug) ?? null;
  }
}

export async function getDidYouKnowItems(): Promise<DidYouKnowListItem[]> {
  if (!process.env.DATABASE_URL) return mockDidYouKnow;
  try {
    return await prisma.didYouKnowItem.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  } catch {
    return mockDidYouKnow;
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
      stories: mockStories.length,
      didYouKnow: mockDidYouKnow.length,
      events: mockEvents.length,
      materials: mockMaterials.length,
      team: mockTeam.length,
      messages: 0,
    };
  }

  /** Per-table counts so one missing/misconfigured table does not replace every stat with mock data. */
  const settled = await Promise.allSettled([
    prisma.blog.count(),
    prisma.story.count(),
    prisma.didYouKnowItem.count(),
    prisma.event.count(),
    prisma.material.count(),
    prisma.teamMember.count(),
    prisma.contactMessage.count(),
  ]);

  const num = (i: number) => (settled[i]?.status === "fulfilled" ? settled[i].value : 0);

  return {
    blogs: num(0),
    stories: num(1),
    didYouKnow: num(2),
    events: num(3),
    materials: num(4),
    team: num(5),
    messages: num(6),
  };
}
