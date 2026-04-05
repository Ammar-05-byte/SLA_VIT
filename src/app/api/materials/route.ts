import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";
import { mockMaterials } from "@/lib/mock-data";

const materialSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().optional(),
  category: z.string().trim().min(1),
  resourceUrl: z.string().url(),
  kind: z.string().trim().min(1),
});

export async function GET() {
  try {
    const materials = await prisma.material.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(materials);
  } catch {
    return NextResponse.json(mockMaterials);
  }
}

export async function POST(req: Request) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await req.json();
  const parsed = materialSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const material = await prisma.material.create({ data: parsed.data });
  return NextResponse.json(material, { status: 201 });
}
