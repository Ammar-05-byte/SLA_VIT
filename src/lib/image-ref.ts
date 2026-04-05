import { z } from "zod";

/** Root-relative path served from `public/` (e.g. `/posters/event.jpg`). */
export function isPublicImagePath(value: string): boolean {
  if (!value.startsWith("/") || value.startsWith("//")) return false;
  if (value.includes("..")) return false;
  if (value.trim() !== value) return false;
  return value.length >= 2;
}

/** Empty string, absolute http(s) URL, or root-relative path from `public/`. */
export const optionalImageRefSchema = z.union([
  z.literal(""),
  z.string().url(),
  z.string().refine(isPublicImagePath, { message: "Invalid path" }),
]);
