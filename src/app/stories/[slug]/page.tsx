import Image from "next/image";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/lib/data";

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <article className="section-container page-section max-w-4xl">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--red)]">Story</p>
      <h1 className="page-title mt-3 text-neutral-950">{story.title}</h1>
      <p className="mt-4 text-base font-normal text-neutral-800 sm:text-lg">{story.excerpt}</p>
      {story.coverImage && (
        <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-2xl">
          <Image src={story.coverImage} alt="" fill className="object-cover" sizes="(max-width: 896px) 100vw, 896px" />
        </div>
      )}
      <div className="article-body">
        <p className="whitespace-pre-wrap">{story.content}</p>
      </div>
    </article>
  );
}
