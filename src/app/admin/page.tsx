import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/data";

export default async function AdminOverviewPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Blogs", value: stats.blogs },
    { label: "Events", value: stats.events },
    { label: "Materials", value: stats.materials },
    { label: "Team", value: stats.team },
    { label: "Messages", value: stats.messages },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent>
            <p className="text-sm uppercase tracking-[0.12em] text-black/55 dark:text-white/55">{card.label}</p>
            <p className="heading mt-2 text-4xl font-semibold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
