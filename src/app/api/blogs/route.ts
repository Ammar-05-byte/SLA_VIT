import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";
import { optionalImageRefSchema } from "@/lib/image-ref";
import { makeSlug } from "@/lib/utils";

const blogSchema = z.object({
  title: z.string().trim().min(1),
  excerpt: z.string().trim().min(1),
  content: z.string().trim().min(1),
  category: z.string().trim().min(1),
  coverImage: optionalImageRefSchema.optional(),
  featured: z.boolean().optional(),
});

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { publishedAt: "desc" } });
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json([]);
  }
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
