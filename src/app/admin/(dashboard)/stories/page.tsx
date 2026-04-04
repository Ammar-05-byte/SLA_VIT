"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatApiError } from "@/lib/admin-api-error";
import { adminInputClass, adminLabelClass, adminPanelClass } from "@/lib/admin-ui";

interface StoryItem {
  id: string;
  title: string;
  slug: string;
}

export default function AdminStoriesPage() {
  const [items, setItems] = useState<StoryItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/stories");
    const data = (await res.json()) as StoryItem[];
    setItems(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        coverImage: formData.get("coverImage") || "",
        featured: formData.get("featured") === "on",
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(formatApiError(body));
      setLoading(false);
      return;
    }

    form.reset();
    await load();
    setLoading(false);
  }

  async function remove(id: string) {
    const res = await fetch(`/api/stories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(formatApiError(body));
      return;
    }
    await load();
  }

  return (
    <div className="space-y-8">
      <form className={adminPanelClass} onSubmit={(ev) => void handleCreate(ev)}>
        <h2 className="heading text-xl font-semibold text-neutral-900">Create Story</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="story-title">
              Title
            </label>
            <Input id="story-title" name="title" className={adminInputClass} placeholder="Story title" required />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="story-cover">
              Cover image URL
            </label>
            <Input id="story-cover" name="coverImage" type="url" className={adminInputClass} placeholder="https://…" />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="story-excerpt">
              Excerpt
            </label>
            <Textarea id="story-excerpt" name="excerpt" className={adminInputClass} placeholder="Teaser" rows={3} required />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="story-content">
              Content
            </label>
            <Textarea id="story-content" name="content" className={adminInputClass} placeholder="Full story" rows={8} required />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700 md:col-span-2">
            <input type="checkbox" name="featured" className="rounded border-neutral-300" />
            Featured
          </label>
        </div>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <Button className="mt-6 rounded-xl" type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create"}
        </Button>
      </form>

      <div className={adminPanelClass}>
        <h2 className="heading text-xl font-semibold text-neutral-900">Existing Stories</h2>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">{item.title}</p>
                <p className="mt-0.5 font-mono text-xs text-neutral-500">/stories/{item.slug}</p>
              </div>
              <Button variant="outline" size="sm" type="button" className="rounded-xl" onClick={() => void remove(item.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
        {items.length === 0 ? <p className="mt-4 text-sm text-neutral-500">No stories yet.</p> : null}
      </div>
    </div>
  );
}
