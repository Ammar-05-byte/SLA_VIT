export function AdminPageHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className={className ?? "mb-6 sm:mb-8"}>
      <h1 className="break-words text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl [font-family:var(--font-admin-serif),Georgia,serif]">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-1 max-w-prose text-sm leading-relaxed text-neutral-600">{subtitle}</p>
      ) : null}
    </header>
  );
}
