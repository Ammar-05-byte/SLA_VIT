import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="section-container page-section max-w-4xl">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--red)]">{blog.category}</p>
      <h1 className="page-title mt-3 text-neutral-950">{blog.title}</h1>
      <p className="mt-4 text-base font-normal text-neutral-800 sm:text-lg">{blog.excerpt}</p>
      <div className="article-body">
        <p>{blog.content}</p>
      </div>
    </article>
  );
}
