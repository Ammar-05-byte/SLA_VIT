import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasUsableDatabaseUrl, prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";
import { allowContactPost, getClientIp } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(1),
});

function smtpConfigured(): boolean {
  return !!(process.env.SMTP_HOST?.trim() && process.env.CONTACT_RECEIVER_EMAIL?.trim());
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!allowContactPost(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const payload = await req.json();
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const hasDb = hasUsableDatabaseUrl();
  const hasSmtp = smtpConfigured();

  if (!hasDb && !hasSmtp) {
    return NextResponse.json(
      { error: "Contact form is not configured (database or email)." },
      { status: 503 },
    );
  }

  let savedToDb = false;
  if (hasDb) {
    try {
      await prisma.contactMessage.create({ data: parsed.data });
      savedToDb = true;
    } catch (err) {
      console.error("[contact] database error:", err);
      return NextResponse.json({ error: "Could not save your message. Please try again later." }, { status: 500 });
    }
  }

  if (hasSmtp) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_RECEIVER_EMAIL,
        subject: `[SLAVIT] ${parsed.data.subject}`,
        text: `${parsed.data.name} (${parsed.data.email})\n\n${parsed.data.message}`,
      });
    } catch (err) {
      console.error("[contact] smtp error:", err);
      if (!savedToDb) {
        return NextResponse.json(
          { error: "Could not deliver your message. Please try again later." },
          { status: 502 },
        );
      }
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET() {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!hasUsableDatabaseUrl()) {
    return NextResponse.json([]);
  }
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return NextResponse.json(messages);
  } catch (err) {
    console.error("[contact] list messages error:", err);
    return NextResponse.json([]);
  }
}
