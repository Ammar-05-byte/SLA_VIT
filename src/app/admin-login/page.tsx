"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid credentials.");
      return;
    }

    router.push("/admin");
  }

  return (
    <section className="section-container flex min-h-[70vh] items-center justify-center py-20">
      <form action={onSubmit} className="glass w-full max-w-md rounded-2xl p-6">
        <h1 className="heading text-3xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-black/65 dark:text-white/65">Use your admin credentials to manage content.</p>
        <Input className="mt-6" name="email" type="email" placeholder="Email" required />
        <Input className="mt-3" name="password" type="password" placeholder="Password" required />
        <Button className="mt-5 w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </form>
    </section>
  );
}
