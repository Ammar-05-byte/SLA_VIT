import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";
import { optionalImageRefSchema } from "@/lib/image-ref";
import { makeSlug } from "@/lib/utils";

const storySchema = z.object({
  title: z.string().trim().min(1),
  excerpt: z.string().trim().min(1),
  content: z.string().trim().min(1),
  coverImage: optionalImageRefSchema.optional(),
  featured: z.boolean().optional(),
});

export async function GET() {
  try {
    const stories = await prisma.story.findMany({ orderBy: { publishedAt: "desc" } });
    return NextResponse.json(stories);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await req.json();
  const parsed = storySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const slug = makeSlug(parsed.data.title);
  const story = await prisma.story.create({
    data: {
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      slug,
      coverImage: parsed.data.coverImage || null,
      featured: parsed.data.featured ?? false,
    },
  });

  return NextResponse.json(story, { status: 201 });
}
