"use client";

import { Section } from "@/components/demo/section";
import { ComponentGridItem } from "@/components/demo/component-grid-item";
import { myComponents } from "@/lib/component-config";

function sectionIdFromLabel(label: string): string {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export function ComponentsPageClient() {
  return (
    <div className="min-h-screen pb-20">
      {myComponents.map((group) => (
        <Section
          key={group.label}
          id={sectionIdFromLabel(group.label)}
          title={group.label}
        >
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {group.items.map((item) => (
              <ComponentGridItem key={item.slug} item={item} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
