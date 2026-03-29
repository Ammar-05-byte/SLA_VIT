import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/data";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="section-container max-w-4xl py-14">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--red)]">{blog.category}</p>
      <h1 className="heading mt-3 text-4xl font-semibold md:text-6xl">{blog.title}</h1>
      <p className="mt-4 text-lg text-black/70 dark:text-white/70">{blog.excerpt}</p>
      <div className="prose prose-lg mt-10 max-w-none dark:prose-invert">
        <p>{blog.content}</p>
      </div>
    </article>
  );
}
