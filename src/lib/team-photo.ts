import { makeSlug } from "@/lib/utils";

/** Encode each path segment so spaces, `&`, etc. work in `/public` filenames. */
export function encodeLocalSitePath(path: string): string {
  const p = path.trim();
  if (!p.startsWith("/") || /^https?:\/\//i.test(p)) return p;
  return (
    "/" +
    p
      .split("/")
      .filter(Boolean)
      .map((seg) => encodeURIComponent(seg))
      .join("/")
  );
}

/**
 * Uses `member.image` when set; otherwise role/name fallbacks, then `/public/team/{slug}.jpg`.
 * President / chairperson with no DB image still get `/public/President.jpg`.
 */
export function resolveTeamMemberPhoto(member: {
  name: string;
  role?: string | null;
  image?: string | null;
}): string {
  const trimmed = member.image?.trim();
  if (trimmed && trimmed.length > 0) {
    return encodeLocalSitePath(trimmed);
  }

  const role = member.role?.trim().toLowerCase() ?? "";
  if (role === "president" || role === "chairperson") {
    return encodeLocalSitePath("/President.jpg");
  }

  if (makeSlug(member.name) === makeSlug("Shrish Singh Sourya")) {
    return encodeLocalSitePath("/President.jpg");
  }

  return encodeLocalSitePath(`/team/${makeSlug(member.name)}.jpg`);
}
