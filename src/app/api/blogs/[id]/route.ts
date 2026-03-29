import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { makeSlug } from "@/lib/utils";
import { ensureAdmin } from "@/lib/api-auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      ...data,
      slug: data.title ? makeSlug(data.title) : undefined,
    },
  });

  return NextResponse.json(blog);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.blog.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
