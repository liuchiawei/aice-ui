"use client";

import { Link } from "@/i18n/navigation";
import type { ComponentItem } from "@/lib/component-config";
import { componentGridItem } from "@/lib/message";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ComponentGridItemProps {
  item: ComponentItem;
}

export function ComponentGridItem({ item }: ComponentGridItemProps) {
  const hasDemo = !!item.demo;
  const hasDescription = !!item.description;
  return (
    <Link
      href={`/components/${item.slug}`}
      className="block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
      aria-label={`View ${item.label} component`}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-base">{item.label}</CardTitle>
          {!hasDemo && (
            <Badge variant="secondary" className="shrink-0">
              Coming soon
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3">
            {hasDescription
              ? item.description
              : hasDemo
                ? componentGridItem.viewDemo
                : componentGridItem.comingSoon}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
