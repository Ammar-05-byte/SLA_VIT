"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const inputClass =
  "mt-2 h-12 rounded-xl border-neutral-300 bg-white text-neutral-900 shadow-none placeholder:text-neutral-400 focus-visible:ring-[#B91C1C]/35";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/sla-vit-logo.png");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") !== "not_admin") return;
    setError("This account is not registered as an admin.");
    const supabase = createClient();
    void supabase.auth.signOut().then(() => {
      router.replace("/admin/login");
    });
  }, [router]);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createClient();

    const { data, error: signError } = await supabase.auth.signInWithPassword({ email, password });

    if (signError || !data.user) {
      setLoading(false);
      setError(signError?.message || "Invalid credentials.");
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("This account is not registered as an admin.");
      return;
    }

    setLoading(false);
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-[100dvh] w-full max-w-[100vw] items-center justify-center overflow-x-hidden bg-[#FFF9E6] px-4 py-10 sm:py-12 md:py-16">
      <form
        className="mx-auto w-full min-w-0 max-w-[420px] rounded-[1.5rem] bg-white px-5 py-8 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] sm:px-8 sm:py-10 md:px-10 md:py-12"
        onSubmit={(e) => {
          e.preventDefault();
          void onSubmit(new FormData(e.currentTarget));
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              "relative mb-7 flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#B91C1C] bg-[#FEF3C7]",
            )}
          >
            <Image
              src={logoSrc}
              alt="Spanish Literary Association"
              fill
              className={logoSrc.endsWith(".svg") ? "object-contain p-2" : "object-cover"}
              sizes="88px"
              priority
              onError={() => setLogoSrc("/sla-admin-badge.svg")}
            />
          </div>

          <h1 className="text-[1.65rem] font-bold tracking-tight text-[#B91C1C] md:text-[1.85rem] [font-family:Georgia,'Times_New_Roman',Times,serif]">
            SLA Admin
          </h1>
          <p className="mt-2 text-sm text-neutral-500">Sign in to your admin account</p>
        </div>

        <div className="mt-10 space-y-5">
          <div>
            <label htmlFor="admin-email" className="text-sm font-medium text-neutral-900">
              Email
            </label>
            <Input
              id="admin-email"
              name="email"
              type="email"
              placeholder="admin@sla.org"
              required
              autoComplete="email"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-sm font-medium text-neutral-900">
              Password
            </label>
            <Input
              id="admin-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className={inputClass}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-8 h-12 w-full rounded-xl border-0 bg-[#B91C1C] text-base font-semibold text-white shadow-none hover:bg-[#991b1b] hover:translate-y-0 hover:shadow-none focus-visible:ring-[#B91C1C]/50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </Button>

        {error ? <p className="mt-4 text-center text-sm text-red-600">{error}</p> : null}
      </form>
    </div>
  );
}
