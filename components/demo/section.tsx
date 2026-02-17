import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-b border-border py-10 last:border-b-0",
        className
      )}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id={`${id}-heading`}
          className="text-xl font-semibold text-foreground"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
