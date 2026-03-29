import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-black/15 bg-white/70 px-4 py-3 text-sm outline-none ring-[var(--ring)] transition placeholder:text-black/45 focus:ring-2 dark:border-white/15 dark:bg-white/5 dark:placeholder:text-white/45",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
