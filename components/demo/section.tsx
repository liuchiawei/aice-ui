import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  description,
  icon,
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
          className={cn(
            "text-xl font-semibold text-foreground",
            icon && "flex items-center gap-2"
          )}
        >
          {icon}
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
