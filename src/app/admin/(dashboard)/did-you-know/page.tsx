"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatApiError } from "@/lib/admin-api-error";
import { adminInputClass, adminLabelClass, adminPanelClass } from "@/lib/admin-ui";

interface DykItem {
  id: string;
  title: string;
  sortOrder: number;
}

export default function AdminDidYouKnowPage() {
  const [items, setItems] = useState<DykItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/did-you-know");
    const data = (await res.json()) as DykItem[];
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
    const orderRaw = String(formData.get("sortOrder") || "").trim();
    const sortOrder = orderRaw === "" ? 0 : Number.parseInt(orderRaw, 10);

    const res = await fetch("/api/did-you-know", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        content: formData.get("content"),
        sourceUrl: formData.get("sourceUrl") || "",
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
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
    const res = await fetch(`/api/did-you-know/${id}`, { method: "DELETE" });
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
        <h2 className="heading text-xl font-semibold text-neutral-900">Add Did You Know?</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="dyk-title">
              Title
            </label>
            <Input id="dyk-title" name="title" className={adminInputClass} placeholder="Fact headline" required />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="dyk-content">
              Content
            </label>
            <Textarea id="dyk-content" name="content" className={adminInputClass} placeholder="The fact, in a sentence or two" rows={5} required />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="dyk-source">
              Source URL (optional)
            </label>
            <Input id="dyk-source" name="sourceUrl" type="url" className={adminInputClass} placeholder="https://…" />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="dyk-order">
              Display order
            </label>
            <Input id="dyk-order" name="sortOrder" type="number" className={adminInputClass} placeholder="0" defaultValue={0} />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <Button className="mt-6 rounded-xl" type="submit" disabled={loading}>
          {loading ? "Adding…" : "Create"}
        </Button>
      </form>

      <div className={adminPanelClass}>
        <h2 className="heading text-xl font-semibold text-neutral-900">Existing facts</h2>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-xs text-neutral-600">Order {item.sortOrder}</p>
                <p className="font-medium text-neutral-900">{item.title}</p>
              </div>
              <Button variant="outline" size="sm" type="button" className="rounded-xl" onClick={() => void remove(item.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
        {items.length === 0 ? <p className="mt-4 text-sm text-neutral-500">No facts yet.</p> : null}
      </div>
    </div>
  );
}
