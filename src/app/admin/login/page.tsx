import { Suspense } from "react";
import { AdminLoginForm } from "./login-form";

function LoginFallback() {
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-[#FFF9E6] px-4">
      <p className="text-sm text-neutral-600">Loading…</p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminLoginForm />
    </Suspense>
  );
}
