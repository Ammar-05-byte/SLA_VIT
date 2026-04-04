"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK = "/sla-vit-logo.png";

export function TeamMemberCard({
  name,
  role,
  photoSrc,
}: {
  name: string;
  role: string;
  photoSrc: string;
}) {
  const [src, setSrc] = useState(photoSrc);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/85 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-sm">
      <div className="relative aspect-[4/5] w-full shrink-0 bg-gradient-to-b from-neutral-100 to-neutral-200/80">
        <Image
          src={src}
          alt={`${name}, ${role}`}
          fill
          className="object-cover object-top"
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 360px"
          priority={false}
          onError={() => setSrc(FALLBACK)}
        />
      </div>
      <div className="flex flex-1 flex-col justify-end p-6 pt-5">
        <h2 className="heading text-xl font-semibold leading-snug text-neutral-950 sm:text-2xl">{name}</h2>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--red)]">{role}</p>
      </div>
    </article>
  );
}
