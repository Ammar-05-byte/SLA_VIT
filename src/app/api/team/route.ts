import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";

const pathOrUrl = z
  .string()
  .max(2048)
  .refine(
    (s) => s === "" || s.startsWith("/") || /^https?:\/\//i.test(s),
    "Image must be a full URL or a site path like /team/name.jpg",
  );

const memberSchema = z.object({
  name: z.string().trim().min(1),
  role: z.string().trim().min(1),
  bio: z.string().optional(),
  image: pathOrUrl.optional(),
  instagram: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
});

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json(team);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await req.json();
  const parsed = memberSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const member = await prisma.teamMember.create({
    data: {
      ...parsed.data,
      bio: parsed.data.bio || null,
      image: parsed.data.image || null,
      instagram: parsed.data.instagram || null,
      linkedin: parsed.data.linkedin || null,
      twitter: parsed.data.twitter || null,
    },
  });

  return NextResponse.json(member, { status: 201 });
}
