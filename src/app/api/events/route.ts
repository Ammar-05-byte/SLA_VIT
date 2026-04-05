import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";
import { optionalImageRefSchema } from "@/lib/image-ref";

const eventSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  location: z.string().optional(),
  image: optionalImageRefSchema.optional(),
  startsAt: z.string().datetime(),
});

export async function GET() {
  try {
    const events = await prisma.event.findMany({ orderBy: { startsAt: "asc" } });
    return NextResponse.json(events);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await req.json();
  const parsed = eventSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const event = await prisma.event.create({
    data: {
      ...parsed.data,
      location: parsed.data.location || null,
      image: parsed.data.image || null,
      startsAt: new Date(parsed.data.startsAt),
    },
  });

  return NextResponse.json(event, { status: 201 });
}
