"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { formatApiError } from "@/lib/admin-api-error";
import { adminInputClass } from "@/lib/admin-ui";
import { cn } from "@/lib/utils";

interface BlogRow {
  id: string;
  title: string;
  slug: string;
  category: string;
}

const panel =
  "max-w-full rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6";

export default function AdminManagePostsPage() {
  const [items, setItems] = useState<BlogRow[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const res = await fetch("/api/blogs");
    const data = (await res.json()) as BlogRow[];
    setItems(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const categories = useMemo(() => {
    const s = new Set(items.map((i) => i.category).filter(Boolean));
    return ["all", ...Array.from(s).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((i) => {
      const catOk = category === "all" || i.category === category;
      const searchOk = !q || i.title.toLowerCase().includes(q) || i.slug.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }, [items, search, category]);

  async function remove(id: string) {
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(formatApiError(body));
      return;
    }
    await load();
  }

  return (
    <div className="min-w-0">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <AdminPageHeader className="mb-0" title="Manage Posts" subtitle={`${items.length} total posts`} />
        <Link
          href="/admin/new-post"
          className={cn(
            buttonVariants({ variant: "default" }),
            "inline-flex shrink-0 rounded-xl bg-[#6B0F1A] text-white hover:translate-y-0 hover:bg-[#5a0d16] hover:shadow-none",
          )}
        >
          + New Post
        </Link>
      </div>

      <div className={`${panel} mb-6`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title…"
              className={`${adminInputClass} pl-10`}
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm text-neutral-900"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All categories" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={panel}>
        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-neutral-600">No posts yet. Create your first post!</p>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {filtered.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-medium text-neutral-900">{item.title}</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-neutral-600">{item.category}</p>
                  <Link href={`/blogs/${item.slug}`} className="text-xs font-medium text-[#6B0F1A] hover:underline">
                    View on site
                  </Link>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => void remove(item.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
