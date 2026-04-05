"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatApiError } from "@/lib/admin-api-error";
import { adminInputClass, adminLabelClass, adminPanelClass } from "@/lib/admin-ui";

interface MaterialItem {
  id: string;
  title: string;
  kind: string;
}

export default function AdminMaterialsPage() {
  const [items, setItems] = useState<MaterialItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/materials");
    const data = (await res.json()) as MaterialItem[];
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

    const res = await fetch("/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        kind: formData.get("kind"),
        category: formData.get("category"),
        resourceUrl: formData.get("resourceUrl"),
        description: formData.get("description") || "",
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
    const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(formatApiError(body));
      return;
    }
    await load();
  }

  return (
    <div className="min-w-0 space-y-8">
      <form className={adminPanelClass} onSubmit={(ev) => void handleCreate(ev)}>
        <h2 className="heading break-words text-lg font-semibold text-neutral-900 sm:text-xl">Add Material</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className={adminLabelClass} htmlFor="mat-title">
              Title
            </label>
            <Input id="mat-title" name="title" className={adminInputClass} placeholder="Resource name" required />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="mat-kind">
              Kind
            </label>
            <Input id="mat-kind" name="kind" className={adminInputClass} placeholder="PDF, Link, Doc…" required />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="mat-cat">
              Category
            </label>
            <Input id="mat-cat" name="category" className={adminInputClass} placeholder="e.g. Reading lists" required />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="mat-url">
              Resource URL
            </label>
            <Input id="mat-url" name="resourceUrl" type="url" className={adminInputClass} placeholder="https://…" required />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="mat-desc">
              Description
            </label>
            <Input id="mat-desc" name="description" className={adminInputClass} placeholder="Optional short note" />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <Button className="mt-6 rounded-xl" type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create"}
        </Button>
      </form>

      <div className={adminPanelClass}>
        <h2 className="heading break-words text-lg font-semibold text-neutral-900 sm:text-xl">Existing Materials</h2>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-neutral-600">{item.kind}</p>
              </div>
              <Button variant="outline" size="sm" type="button" className="rounded-xl" onClick={() => void remove(item.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
        {items.length === 0 ? <p className="mt-4 text-sm text-neutral-500">No materials yet.</p> : null}
      </div>
    </div>
  );
}
