"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { formatApiError } from "@/lib/admin-api-error";
import { adminInputClass, adminLabelClass } from "@/lib/admin-ui";

const panel =
  "max-w-full rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm sm:p-6 ";

export default function AdminNewPostPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        category: formData.get("category"),
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
    setLoading(false);
    router.push("/admin/manage-posts");
    router.refresh();
  }

  return (
    <div className="min-w-0">
      <AdminPageHeader title="New Post" subtitle="Create a blog post for the public site (Prisma)." />

      <form className={panel} onSubmit={(ev) => void handleCreate(ev)}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={adminLabelClass} htmlFor="np-title">
              Title
            </label>
            <Input id="np-title" name="title" className={adminInputClass} placeholder="Post title" required />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="np-cat">
              Category
            </label>
            <Input id="np-cat" name="category" className={adminInputClass} placeholder="e.g. Literature" required />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="np-cover">
              Cover image URL
            </label>
            <Input id="np-cover" name="coverImage" type="text" className={adminInputClass} placeholder="https://… or /images/cover.jpg" />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="np-excerpt">
              Excerpt
            </label>
            <Textarea id="np-excerpt" name="excerpt" className={adminInputClass} rows={3} required />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="np-content">
              Content
            </label>
            <Textarea id="np-content" name="content" className={adminInputClass} rows={12} required />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800 md:col-span-2">
            <input type="checkbox" name="featured" className="rounded border-neutral-300" />
            Featured
          </label>
        </div>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <Button className="mt-6 rounded-xl bg-[#6B0F1A] text-white hover:bg-[#5a0d16]" type="submit" disabled={loading}>
          {loading ? "Publishing…" : "Publish post"}
        </Button>
      </form>
    </div>
  );
}
