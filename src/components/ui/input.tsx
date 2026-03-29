import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-black/15 bg-white/70 px-4 py-2 text-sm outline-none ring-[var(--ring)] transition placeholder:text-black/45 focus:ring-2 dark:border-white/15 dark:bg-white/5 dark:placeholder:text-white/45",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
