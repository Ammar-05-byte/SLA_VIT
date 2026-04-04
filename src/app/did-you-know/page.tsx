import { getDidYouKnowItems, type DidYouKnowListItem } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function DidYouKnowPage() {
  const items: DidYouKnowListItem[] = await getDidYouKnowItems();

  return (
    <section className="section-container page-section">
      <Badge>Discover</Badge>
      <h1 className="page-title mt-4">Did You Know?</h1>
      <p className="mt-6 max-w-2xl text-base text-neutral-700 md:text-lg">
        Quick facts about Spanish language, literature, and culture—curated by SLA VIT.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--red)]">
                Fact {index + 1}
              </p>
              <h2 className="heading mt-2 text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.content}</p>
              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-[var(--red)] underline-offset-4 hover:underline"
                >
                  Source
                </a>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
