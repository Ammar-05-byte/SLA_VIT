"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface MaterialItem {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  resourceUrl: string;
  kind: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    void fetch("/api/materials", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setMaterials(data as MaterialItem[]))
      .catch(() => setMaterials([]));
  }, []);

  const categories = useMemo(() => ["All", ...new Set(materials.map((item) => item.category))], [materials]);

  const filtered = useMemo(() => {
    return materials.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const searchMatch = `${item.title} ${item.description || ""}`.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [category, materials, search]);

  return (
    <section className="section-container page-section">
      <Badge>Resource Hub</Badge>
      <h1 className="page-title mt-4">Materials</h1>
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <Input className="pl-9" placeholder="Search materials" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select
          className="h-11 rounded-xl border border-black/15 bg-white/70 px-4 text-sm dark:border-white/15 dark:bg-white/5"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((material) => (
          <Card key={material.id}>
            <CardContent>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--red)]">{material.kind}</p>
              <h2 className="heading mt-2 text-xl font-semibold">{material.title}</h2>
              <p className="mt-2 text-sm text-neutral-600">{material.description}</p>
              <a
                href={material.resourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-full bg-black px-4 py-2 text-xs uppercase tracking-[0.12em] text-white dark:bg-white dark:text-black"
              >
                View Resource
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}


