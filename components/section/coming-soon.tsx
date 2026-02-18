"use client";

import { comingSoonTitle, comingSoonDescription } from "@/lib/message";

interface ComingSoonProps {
  componentName?: string;
}

export function ComingSoon({ componentName }: ComingSoonProps) {
  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center rounded-lg border border-border bg-muted/50 px-6 py-12 text-center"
      aria-label={comingSoonTitle}
    >
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent)]" />
      <div className="relative space-y-3">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {comingSoonTitle}
        </p>
        {componentName && (
          <h2 className="text-lg font-semibold text-foreground">
            {componentName}
          </h2>
        )}
        <p className="max-w-sm text-sm text-muted-foreground">
          {comingSoonDescription}
        </p>
      </div>
    </section>
  );
}
