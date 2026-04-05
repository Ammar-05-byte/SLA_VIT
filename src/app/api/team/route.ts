import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";

const imageSchema = z.string().trim().optional().or(z.literal(""));
const socialSchema = z.string().trim().max(300).optional().or(z.literal(""));

const memberSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  bio: z.string().optional(),
  image: imageSchema,
  instagram: socialSchema,
  linkedin: socialSchema,
  twitter: socialSchema,
});

function normalizeImage(value?: string) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) return trimmed;
  return `/${trimmed.replace(/^\/+/, "")}`;
}

function normalizeSocial(value: string | undefined, platform: "instagram" | "linkedin" | "twitter") {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const cleanHandle = trimmed.replace(/^@+/, "");
  if (!cleanHandle) return null;

  if (platform === "instagram") return `https://instagram.com/${cleanHandle}`;
  if (platform === "linkedin") return `https://linkedin.com/in/${cleanHandle}`;
  return `https://x.com/${cleanHandle}`;
}

function normalizeText(value?: string) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed || null;
}

export async function GET() {
  const team = await prisma.teamMember.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(team);
}

export async function POST(req: Request) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = await req.json();
    const parsed = memberSchema.safeParse(payload);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed",
          details: fieldErrors,
        },
        { status: 400 },
      );
    }

    const member = await prisma.teamMember.create({
      data: {
        name: parsed.data.name.trim(),
        role: parsed.data.role.trim(),
        bio: normalizeText(parsed.data.bio),
        image: normalizeImage(parsed.data.image),
        instagram: normalizeSocial(parsed.data.instagram, "instagram"),
        linkedin: normalizeSocial(parsed.data.linkedin, "linkedin"),
        twitter: normalizeSocial(parsed.data.twitter, "twitter"),
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error while creating team member.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
