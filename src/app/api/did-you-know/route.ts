import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";

const itemSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  sortOrder: z.number().int().optional(),
});

export async function GET() {
  try {
    const items = await prisma.didYouKnowItem.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await req.json();
  const parsed = itemSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const item = await prisma.didYouKnowItem.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      sourceUrl: parsed.data.sourceUrl || null,
      sortOrder: parsed.data.sortOrder ?? 0,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
