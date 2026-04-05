"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatApiError } from "@/lib/admin-api-error";
import { adminInputClass, adminLabelClass, adminPanelClass } from "@/lib/admin-ui";

interface MemberItem {
  id: string;
  name: string;
  role: string;
}

export default function AdminTeamPage() {
  const [items, setItems] = useState<MemberItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/team");
    const data = (await res.json()) as MemberItem[];
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

    const res = await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        role: formData.get("role"),
        bio: formData.get("bio") || "",
        image: formData.get("image") || "",
        instagram: formData.get("instagram") || "",
        linkedin: formData.get("linkedin") || "",
        twitter: formData.get("twitter") || "",
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
    const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
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
        <h2 className="heading break-words text-lg font-semibold text-neutral-900 sm:text-xl">Add Team Member</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className={adminLabelClass} htmlFor="team-name">
              Name
            </label>
            <Input id="team-name" name="name" className={adminInputClass} placeholder="Full name" required />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="team-role">
              Role
            </label>
            <Input id="team-role" name="role" className={adminInputClass} placeholder="Position" required />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="team-image">
              Photo URL
            </label>
            <Input
              id="team-image"
              name="image"
              type="text"
              className={adminInputClass}
              placeholder="/President.jpg or /Director of Editorial & Publications.jpg"
            />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="team-ig">
              Instagram
            </label>
            <Input id="team-ig" name="instagram" type="url" className={adminInputClass} placeholder="https://…" />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="team-li">
              LinkedIn
            </label>
            <Input id="team-li" name="linkedin" type="url" className={adminInputClass} placeholder="https://…" />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="team-x">
              X (Twitter)
            </label>
            <Input id="team-x" name="twitter" type="url" className={adminInputClass} placeholder="https://…" />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="team-bio">
              Bio
            </label>
            <Textarea id="team-bio" name="bio" className={adminInputClass} placeholder="Short bio" rows={4} />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <Button className="mt-6 rounded-xl" type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create"}
        </Button>
      </form>

      <div className={adminPanelClass}>
        <h2 className="heading break-words text-lg font-semibold text-neutral-900 sm:text-xl">Existing Team</h2>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-neutral-600">{item.role}</p>
              </div>
              <Button variant="outline" size="sm" type="button" className="rounded-xl" onClick={() => void remove(item.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
        {items.length === 0 ? <p className="mt-4 text-sm text-neutral-500">No team members yet.</p> : null}
      </div>
    </div>
  );
}
