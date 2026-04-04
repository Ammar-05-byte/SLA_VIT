import Link from "next/link";
import { FileText, PenSquare } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { adminPanelClass } from "@/lib/admin-ui";
import { cn } from "@/lib/utils";

const card =
  "flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-[#6B0F1A]/30 hover:bg-neutral-50/80";

export default function AdminBlogsHubPage() {
  return (
    <div>
      <AdminPageHeader
        title="Blogs"
        subtitle="Manage public blog posts (Prisma). Open the list to edit or delete, or create a new post."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/manage-posts" className={cn(adminPanelClass, card)}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6B0F1A]/10 text-[#6B0F1A]">
            <FileText className="h-5 w-5" aria-hidden />
          </span>
          <span>
            <span className="block font-semibold text-neutral-900">Manage posts</span>
            <span className="text-sm text-neutral-600">View, edit, and remove published posts</span>
          </span>
        </Link>

        <Link href="/admin/new-post" className={cn(adminPanelClass, card)}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6B0F1A]/10 text-[#6B0F1A]">
            <PenSquare className="h-5 w-5" aria-hidden />
          </span>
          <span>
            <span className="block font-semibold text-neutral-900">New post</span>
            <span className="text-sm text-neutral-600">Create a draft and publish to the site</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
