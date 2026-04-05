import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasUsableDatabaseUrl, prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(1),
});

export async function POST(req: Request) {
  const payload = await req.json();
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (hasUsableDatabaseUrl()) {
    try {
      await prisma.contactMessage.create({ data: parsed.data });
    } catch {
      /* continue: email path may still work */
    }
  }

  if (process.env.SMTP_HOST && process.env.CONTACT_RECEIVER_EMAIL) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `[SLAVIT] ${parsed.data.subject}`,
      text: `${parsed.data.name} (${parsed.data.email})\n\n${parsed.data.message}`,
    });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET() {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!hasUsableDatabaseUrl()) {
    return NextResponse.json([]);
  }
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json(messages);
}
