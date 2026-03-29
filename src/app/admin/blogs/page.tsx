"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BlogItem {
  id: string;
  title: string;
  category: string;
}

export default function AdminBlogsPage() {
  const [items, setItems] = useState<BlogItem[]>([]);

  const load = async () => {
    const res = await fetch("/api/blogs");
    setItems(await res.json());
  };

  useEffect(() => {
    void fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  async function createBlog(formData: FormData) {
    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        category: formData.get("category"),
        coverImage: formData.get("coverImage"),
      }),
    });
    await load();
  }

  async function remove(id: string) {
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-8">
      <form action={createBlog} className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Create Blog</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="title" placeholder="Title" required />
          <Input name="category" placeholder="Category" required />
          <Input name="coverImage" placeholder="Cover image URL" className="md:col-span-2" />
          <Textarea name="excerpt" placeholder="Excerpt" className="md:col-span-2" required />
          <Textarea name="content" placeholder="Content" className="md:col-span-2" required />
        </div>
        <Button className="mt-4">Create</Button>
      </form>

      <div className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Existing Blogs</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-black/10 p-3 dark:border-white/10">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">{item.category}</p>
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
