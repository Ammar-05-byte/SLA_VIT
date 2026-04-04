import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function BlogsPage() {
  const blogs: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    coverImage?: string | null;
  }> = await getBlogs();

  return (
    <section className="section-container page-section">
      <Badge>Editorial</Badge>
      <h1 className="page-title mt-4">Stories and Essays</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link href={`/blogs/${blog.slug}`} key={blog.id}>
            <Card className="h-full overflow-hidden transition hover:translate-y-[-4px]">
              {blog.coverImage && (
                <Image src={blog.coverImage} alt={blog.title} width={1200} height={800} className="h-52 w-full object-cover" />
              )}
              <CardContent>
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-600">{blog.category}</p>
                <h2 className="heading mt-2 text-xl font-semibold">{blog.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{blog.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
