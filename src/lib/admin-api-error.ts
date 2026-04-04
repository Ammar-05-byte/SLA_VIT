export function formatApiError(body: unknown): string {
  if (!body || typeof body !== "object") return "Request failed";
  const rec = body as { error?: unknown; message?: string };
  if (typeof rec.message === "string" && rec.message) return rec.message;
  const err = rec.error;
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "fieldErrors" in err) {
    const fe = (err as { fieldErrors: Record<string, string[] | undefined> }).fieldErrors;
    const first = Object.values(fe)
      .flat()
      .find((m) => typeof m === "string" && m.length > 0);
    if (first) return first;
  }
  return "Request failed";
}
