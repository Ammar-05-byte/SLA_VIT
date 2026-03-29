"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EventItem {
  id: string;
  title: string;
  startsAt: string;
}

export default function AdminEventsPage() {
  const [items, setItems] = useState<EventItem[]>([]);

  const load = async () => {
    const res = await fetch("/api/events");
    setItems(await res.json());
  };

  useEffect(() => {
    void fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  async function createEvent(formData: FormData) {
    const startsAt = new Date(String(formData.get("startsAt"))).toISOString();
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        image: formData.get("image"),
        location: formData.get("location"),
        startsAt,
      }),
    });
    await load();
  }

  async function remove(id: string) {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-8">
      <form action={createEvent} className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Create Event</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="title" placeholder="Title" required />
          <Input name="location" placeholder="Location" />
          <Input name="image" placeholder="Poster URL" className="md:col-span-2" />
          <Input name="startsAt" type="datetime-local" className="md:col-span-2" required />
          <Textarea name="description" placeholder="Description" className="md:col-span-2" required />
        </div>
        <Button className="mt-4">Create</Button>
      </form>

      <div className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Existing Events</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-black/10 p-3 dark:border-white/10">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">{item.startsAt}</p>
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
