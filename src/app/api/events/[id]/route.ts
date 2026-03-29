import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const { id } = await params;
  const event = await prisma.event.update({
    where: { id },
    data: {
      ...data,
      startsAt: data.startsAt ? new Date(data.startsAt) : undefined,
    },
  });
  return NextResponse.json(event);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
