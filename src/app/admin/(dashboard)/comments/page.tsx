"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { formatApiError } from "@/lib/admin-api-error";

interface CommentRow {
  id: string;
  post_id: string;
  commenter_name: string;
  content: string;
  created_at: string;
}

const panel = "rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm";

export default function AdminCommentsPage() {
  const [items, setItems] = useState<CommentRow[]>([]);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  const load = useCallback(async () => {
    setLoadError("");
    const res = await fetch("/api/admin/comments");
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setLoadError(formatApiError(body));
      setItems([]);
      return;
    }
    const data = (await res.json()) as CommentRow[];
    setItems(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(id: string) {
    const res = await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(formatApiError(body));
      return;
    }
    setError("");
    await load();
  }

  return (
    <div>
      <AdminPageHeader title="Comments" subtitle="Moderate comments across Supabase posts" />

      <div className={panel}>
        {loadError ? <p className="mb-4 text-sm text-red-600">{loadError}</p> : null}
        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
        {items.length === 0 && !loadError ? (
          <p className="py-12 text-center text-sm text-neutral-600">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((c) => (
              <li
                key={c.id}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900">{c.commenter_name}</p>
                    <p className="text-xs text-neutral-600">
                      Post ID: {c.post_id.slice(0, 8)}… · {c.created_at ? new Date(c.created_at).toLocaleString() : ""}
                    </p>
                    <p className="mt-2 text-sm text-neutral-800">{c.content}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl shrink-0"
                    onClick={() => void remove(c.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
