"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";

const words = [
  { es: "duende", en: "soulful artistic spirit" },
  { es: "sobremesa", en: "conversation after a meal" },
  { es: "amanecer", en: "sunrise" },
  { es: "libertad", en: "freedom" },
  { es: "poesia", en: "poetry" },
];

export function WordOfDay() {
  const pick = useMemo(() => {
    const day = new Date().getDate();
    return words[day % words.length];
  }, []);

  return (
    <Card className="section-container mb-20">
      <CardContent className="flex flex-col items-start gap-1 py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/55 dark:text-white/55">Spanish Word of the Day</p>
          <p className="heading mt-2 text-3xl font-semibold text-[var(--red)] md:text-4xl">{pick.es}</p>
        </div>
        <p className="text-black/70 dark:text-white/70">{pick.en}</p>
      </CardContent>
    </Card>
  );
}
