import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";
import { makeSlug } from "@/lib/utils";

const blogSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(8),
  content: z.string().min(20),
  category: z.string().min(2),
  coverImage: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().optional(),
});

export async function GET() {
  const blogs = await prisma.blog.findMany({ orderBy: { publishedAt: "desc" } });
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await req.json();
  const parsed = blogSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const slug = makeSlug(parsed.data.title);
  const blog = await prisma.blog.create({
    data: {
      ...parsed.data,
      slug,
      coverImage: parsed.data.coverImage || null,
      featured: parsed.data.featured || false,
    },
  });

  return NextResponse.json(blog, { status: 201 });
}
