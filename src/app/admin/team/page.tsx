"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MemberItem {
  id: string;
  name: string;
  role: string;
}

export default function AdminTeamPage() {
  const [items, setItems] = useState<MemberItem[]>([]);

  const load = async () => {
    const res = await fetch("/api/team");
    setItems(await res.json());
  };

  useEffect(() => {
    void fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  async function createMember(formData: FormData) {
    await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        role: formData.get("role"),
        bio: formData.get("bio"),
        instagram: formData.get("instagram"),
        linkedin: formData.get("linkedin"),
        twitter: formData.get("twitter"),
      }),
    });
    await load();
  }

  async function remove(id: string) {
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-8">
      <form action={createMember} className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Add Team Member</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="name" placeholder="Name" required />
          <Input name="role" placeholder="Role" required />
          <Input name="instagram" placeholder="Instagram URL" />
          <Input name="linkedin" placeholder="LinkedIn URL" />
          <Input name="twitter" placeholder="X URL" className="md:col-span-2" />
          <Textarea name="bio" placeholder="Bio" className="md:col-span-2" />
        </div>
        <Button className="mt-4">Create</Button>
      </form>

      <div className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Existing Team</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-black/10 p-3 dark:border-white/10">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">{item.role}</p>
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
