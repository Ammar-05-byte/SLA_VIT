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
    <header className={className ?? "mb-8"}>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 [font-family:var(--font-admin-serif),Georgia,serif]">
        {title}
      </h1>
      {subtitle ? <p className="mt-1 text-sm text-neutral-600">{subtitle}</p> : null}
    </header>
  );
}
