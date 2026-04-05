"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setResult("");

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) {
      setResult("Your message has been received. We will get back to you soon.");
      formRef.current?.reset();
      return;
    }
    let detail = "Could not send your message. Please try again.";
    try {
      const body = (await res.json()) as {
        error?: { fieldErrors?: Record<string, string[]>; formErrors?: string[] };
      };
      const fe = body.error?.fieldErrors;
      if (fe) {
        const parts = Object.entries(fe).flatMap(([k, msgs]) =>
          msgs?.length ? [`${k}: ${msgs.join(", ")}`] : [],
        );
        if (parts.length) detail = parts.join(" ");
      } else if (body.error?.formErrors?.length) {
        detail = body.error.formErrors.join(" ");
      }
    } catch {
      /* ignore */
    }
    setResult(detail);
  }

  return (
    <section className="section-container page-section">
      <Badge>Contact</Badge>
      <h1 className="page-title mt-4">Lets Build Cultural Moments</h1>

      <form ref={formRef} action={onSubmit} className="glass mt-10 max-w-2xl rounded-2xl p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="name" placeholder="Your name" required />
          <Input name="email" type="email" placeholder="Email" required />
        </div>
        <Input name="subject" placeholder="Subject" className="mt-4" required />
        <Textarea name="message" placeholder="Your message" className="mt-4" required />
        <Button className="mt-4" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
        {result && <p className="mt-3 text-sm text-neutral-700">{result}</p>}
      </form>
    </section>
  );
}
