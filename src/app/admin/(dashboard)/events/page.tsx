"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatApiError } from "@/lib/admin-api-error";
import { adminInputClass, adminLabelClass, adminPanelClass } from "@/lib/admin-ui";

interface EventItem {
  id: string;
  title: string;
  startsAt: string;
}

export default function AdminEventsPage() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/events");
    const data = (await res.json()) as EventItem[];
    setItems(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const res = await fetch("/api/events");
      const data = (await res.json()) as EventItem[];
      if (!cancelled) setItems(Array.isArray(data) ? data : []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const startsRaw = String(formData.get("startsAt"));
    const startsAt = new Date(startsRaw).toISOString();

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        location: formData.get("location") || "",
        image: formData.get("image") || "",
        startsAt,
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
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
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
        <h2 className="heading break-words text-lg font-semibold text-neutral-900 sm:text-xl">Create Event</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className={adminLabelClass} htmlFor="event-title">
              Title
            </label>
            <Input id="event-title" name="title" className={adminInputClass} placeholder="Event name" required />
          </div>
          <div>
            <label className={adminLabelClass} htmlFor="event-location">
              Location
            </label>
            <Input id="event-location" name="location" className={adminInputClass} placeholder="Venue or online" />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="event-starts">
              Starts at
            </label>
            <Input id="event-starts" name="startsAt" type="datetime-local" className={adminInputClass} required />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="event-image">
              Poster image URL
            </label>
            <Input id="event-image" name="image" type="text" className={adminInputClass} placeholder="https://… or /images/event.jpg" />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="event-desc">
              Description
            </label>
            <Textarea id="event-desc" name="description" className={adminInputClass} placeholder="What to expect" rows={5} required />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <Button className="mt-6 rounded-xl" type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create"}
        </Button>
      </form>

      <div className={adminPanelClass}>
        <h2 className="heading break-words text-lg font-semibold text-neutral-900 sm:text-xl">Existing Events</h2>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">{item.title}</p>
                <p className="text-xs text-neutral-600">{new Date(item.startsAt).toLocaleString()}</p>
              </div>
              <Button variant="outline" size="sm" type="button" className="rounded-xl" onClick={() => void remove(item.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
        {items.length === 0 ? <p className="mt-4 text-sm text-neutral-500">No events yet.</p> : null}
      </div>
    </div>
  );
}
