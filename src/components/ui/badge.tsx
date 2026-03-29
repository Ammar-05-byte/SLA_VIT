import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/15 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] dark:border-white/15 dark:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}
