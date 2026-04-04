"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatApiError } from "@/lib/admin-api-error";
import { adminPanelClass } from "@/lib/admin-ui";

interface ContactRow {
  id: string;
  subject: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactRow[]>([]);
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");

  const load = useCallback(async () => {
    setError("");
    setHint("");
    const res = await fetch("/api/contact");
    if (res.status === 401) {
      setError("You need to be signed in as an admin.");
      setMessages([]);
      return;
    }
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(formatApiError(body));
      setMessages([]);
      return;
    }
    const data = (await res.json()) as ContactRow[];
    const list = Array.isArray(data) ? data : [];
    setMessages(list);
    setHint(list.length === 0 ? "No messages stored yet, or DATABASE_URL is not set." : "");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(id: string) {
    const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(formatApiError(body));
      return;
    }
    await load();
  }

  return (
    <div className={adminPanelClass}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="heading text-xl font-semibold text-neutral-900">Contact Messages</h2>
        <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={() => void load()}>
          Refresh
        </Button>
      </div>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {!error && hint ? <p className="mt-4 text-sm text-neutral-500">{hint}</p> : null}
      <ul className="mt-5 space-y-4">
        {messages.map((message) => (
          <li
            key={message.id}
            className="rounded-xl border border-neutral-200 bg-white p-4 "
          >
            <p className="font-medium text-neutral-900">{message.subject}</p>
            <p className="mt-1 text-sm text-neutral-600">
              {message.name} · {message.email}
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              {message.createdAt ? new Date(message.createdAt).toLocaleString() : ""}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-800">{message.message}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4 rounded-xl"
              onClick={() => void remove(message.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
