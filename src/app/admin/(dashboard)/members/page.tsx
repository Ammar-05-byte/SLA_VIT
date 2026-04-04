"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { formatApiError } from "@/lib/admin-api-error";

interface AdminRow {
  id: string;
  email: string;
  name: string;
  role: string;
}

const panel = "rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm";

function roleBadge(role: string) {
  const r = role?.toLowerCase() || "";
  const warm = r === "president" ? "bg-amber-100 text-amber-900" : "bg-neutral-200 text-neutral-800";
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${warm}`}>
      {role || "admin"}
    </span>
  );
}

export default function AdminMembersPage() {
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [error, setError] = useState("");
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError("");
    const res = await fetch("/api/admin/admins");
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(formatApiError(body));
      return;
    }
    const data = (await res.json()) as AdminRow[];
    setAdmins(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    void load();
    void fetch("/api/admin/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => j?.email && setCurrentEmail(String(j.email)))
      .catch(() => {});
  }, [load]);

  return (
    <div>
      <AdminPageHeader
        title="Members"
        subtitle="View admin accounts. Add or change admins in the Supabase Table Editor (public.admins) — link Auth user id to each row."
      />

      <div className={panel}>
        <h2 className="text-lg font-semibold text-neutral-900">Current admins</h2>
        <ul className="mt-4 space-y-3">
          {admins.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B0F1A]/15 text-sm font-bold text-[#6B0F1A]">
                  {a.name?.charAt(0) ?? "?"}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-neutral-900">
                    {a.name}
                    {currentEmail && a.email === currentEmail ? (
                      <span className="ml-1 text-xs font-normal text-neutral-600">(you)</span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-neutral-600">{a.email}</p>
                </div>
              </div>
              {roleBadge(a.role)}
            </li>
          ))}
        </ul>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        {admins.length === 0 && !error ? (
          <p className="mt-4 text-sm text-neutral-600">No admins returned. Check Supabase RLS or add rows in the dashboard.</p>
        ) : null}
      </div>
    </div>
  );
}
