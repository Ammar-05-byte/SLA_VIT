"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MemberItem {
  id: string;
  name: string;
  role: string;
  image?: string | null;
}

function getErrorMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;

  const data = payload as {
    error?: string;
    details?: Record<string, string[] | undefined>;
  };

  if (data.details && typeof data.details === "object") {
    const entries = Object.entries(data.details)
      .filter(([, value]) => Array.isArray(value) && value.length > 0)
      .map(([field, value]) => `${field}: ${value?.[0]}`);

    if (entries.length > 0) return entries.join(" | ");
  }

  if (typeof data.error === "string" && data.error.trim()) return data.error;
  return null;
}

function isAuthError(res: Response, payload: unknown) {
  if (res.status === 401 || res.status === 403) return true;
  if (payload && typeof payload === "object") {
    const data = payload as { error?: string };
    if (typeof data.error === "string" && data.error.toLowerCase().includes("unauthorized")) return true;
  }
  return false;
}

export default function AdminTeamPage() {
  const [items, setItems] = useState<MemberItem[]>([]);
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch("/api/team");
    setItems(await res.json());
  };

  useEffect(() => {
    void fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  async function uploadImage(file: File) {
    setStatusMessage(null);
    setIsUploading(true);
    try {
      const payload = new FormData();
      payload.append("file", file);

      const res = await fetch("/api/team/upload", {
        method: "POST",
        body: payload,
      });

      const data = (await res.json().catch(() => null)) as { error?: string; url?: string } | null;

      if (isAuthError(res, data)) {
        setStatusMessage("Session expired. Please sign in again at /admin-login.");
        return;
      }

      if (!res.ok || !data?.url) {
        setStatusMessage(data?.error ?? "Image upload failed. Please try another file.");
        return;
      }

      setImage(data.url);
      setStatusMessage("Image uploaded successfully.");
    } catch {
      setStatusMessage("Image upload failed. Please check your connection and retry.");
    } finally {
      setIsUploading(false);
    }
  }

  async function onImageFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadImage(file);
    event.target.value = "";
  }

  async function createMember(formData: FormData) {
    setIsSaving(true);
    setStatusMessage(null);
    const res = await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        role: formData.get("role"),
        bio: formData.get("bio"),
        image: formData.get("image"),
        instagram: formData.get("instagram"),
        linkedin: formData.get("linkedin"),
        twitter: formData.get("twitter"),
      }),
    });

    if (!res.ok) {
      const payload = (await res.json().catch(() => null)) as unknown;
      if (isAuthError(res, payload)) {
        setStatusMessage("Session expired. Please sign in again at /admin-login.");
        setIsSaving(false);
        return;
      }

      const apiMessage = getErrorMessage(payload);
      setStatusMessage(apiMessage ?? "Failed to create member. Check required fields and try again.");
      setIsSaving(false);
      return;
    }

    setStatusMessage("Team member created.");
    setImage("");
    await load();
    setIsSaving(false);
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
          <div className="md:col-span-2 rounded-xl border border-black/15 bg-white/70 p-4 dark:border-white/15 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.12em] text-black/65 dark:text-white/65">Upload Member Photo</p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={onImageFileChange}
              className="mt-3 block w-full text-sm file:mr-4 file:rounded-lg file:border file:border-black/20 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-black/5 dark:file:border-white/20 dark:file:bg-white/10 dark:file:text-white dark:hover:file:bg-white/15"
            />
            <p className="mt-2 text-xs text-black/55 dark:text-white/55">Accepted formats: JPG, PNG, WEBP, GIF. Maximum size: 4 MB.</p>
            {isUploading && <p className="mt-2 text-xs text-black/70 dark:text-white/70">Uploading image...</p>}
          </div>
          <Input
            name="image"
            placeholder="Photo URL (auto-filled after upload)"
            className="md:col-span-2"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
          {image && (
            <div className="md:col-span-2">
              <p className="mb-2 text-xs uppercase tracking-[0.12em] text-black/65 dark:text-white/65">Preview</p>
              <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
                <Image src={image} alt="Member preview" fill className="object-cover" />
              </div>
            </div>
          )}
          <Input name="instagram" placeholder="Instagram URL" />
          <Input name="linkedin" placeholder="LinkedIn URL" />
          <Input name="twitter" placeholder="X URL" className="md:col-span-2" />
          <Textarea name="bio" placeholder="Bio" className="md:col-span-2" />
        </div>
        {statusMessage && <p className="mt-3 text-sm text-black/70 dark:text-white/70">{statusMessage}</p>}
        <Button className="mt-4" disabled={isUploading || isSaving}>
          {isSaving ? "Creating..." : "Create"}
        </Button>
      </form>

      <div className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Existing Team</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-black/10 p-3 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
                  {item.image ? (
                    <Image src={item.image} alt={`${item.name} profile`} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.12em] text-black/55 dark:text-white/55">
                      No photo
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">{item.role}</p>
                </div>
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
