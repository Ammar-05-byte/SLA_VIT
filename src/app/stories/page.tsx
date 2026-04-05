import Link from "next/link";
import Image from "next/image";
import { getStories } from "@/lib/data";

export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <section className="section-container page-section">
      <Badge>Community</Badge>
      <h1 className="page-title mt-4">Stories</h1>
      <p className="mt-6 max-w-2xl text-base text-neutral-700 md:text-lg">
        Member stories, reflections, and cultural moments from the Spanish Literary Association.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <Link href={`/stories/${story.slug}`} key={story.id}>
            <Card className="h-full overflow-hidden transition hover:translate-y-[-4px]">
              {story.coverImage && (
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  width={1200}
                  height={800}
                  className="h-52 w-full object-cover"
                />
              )}
              <CardContent>
                <h2 className="heading mt-2 text-xl font-semibold">{story.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{story.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
