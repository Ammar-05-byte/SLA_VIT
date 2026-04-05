import { PrismaClient } from "@prisma/client";

/** True when DATABASE_URL looks like a real Postgres URI (not the .env.example placeholder). */
export function hasUsableDatabaseUrl(): boolean {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw) return false;
  if (/USER:PASSWORD@HOST:/i.test(raw)) return false;
  if (/@HOST:5432\//i.test(raw)) return false;
  return true;
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
