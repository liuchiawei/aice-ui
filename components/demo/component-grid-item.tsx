"use client";

import Link from "next/link";
import type { ComponentItem } from "@/lib/component-config";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComingSoon } from "@/components/section/coming-soon";

interface ComponentGridItemProps {
  item: ComponentItem;
}

export function ComponentGridItem({ item }: ComponentGridItemProps) {
  const Demo = item.demo;

  return (
    <Link
      href={`/components/${item.slug}`}
      className="block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
      aria-label={`View ${item.label} component`}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-base">{item.label}</CardTitle>
          {!Demo && (
            <Badge variant="secondary" className="shrink-0">
              Coming soon
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex-1">
          <div className="aspect-square flex items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/30">
            {Demo ? <Demo /> : <ComingSoon componentName={item.label} />}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
