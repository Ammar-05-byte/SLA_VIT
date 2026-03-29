"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MaterialItem {
  id: string;
  title: string;
  kind: string;
}

export default function AdminMaterialsPage() {
  const [items, setItems] = useState<MaterialItem[]>([]);

  const load = async () => {
    const res = await fetch("/api/materials");
    setItems(await res.json());
  };

  useEffect(() => {
    void fetch("/api/materials")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  async function createMaterial(formData: FormData) {
    await fetch("/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        resourceUrl: formData.get("resourceUrl"),
        kind: formData.get("kind"),
      }),
    });
    await load();
  }

  async function remove(id: string) {
    await fetch(`/api/materials/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-8">
      <form action={createMaterial} className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Add Material</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="title" placeholder="Title" required />
          <Input name="kind" placeholder="Kind (PDF/Link)" required />
          <Input name="category" placeholder="Category" required />
          <Input name="resourceUrl" placeholder="Resource URL" required />
          <Input name="description" placeholder="Description" className="md:col-span-2" />
        </div>
        <Button className="mt-4">Create</Button>
      </form>

      <div className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Existing Materials</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-black/10 p-3 dark:border-white/10">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">{item.kind}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => remove(item.id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
