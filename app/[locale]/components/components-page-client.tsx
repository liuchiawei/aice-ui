"use client";

import { Section } from "@/components/demo/section";
import { ComponentGridItem } from "@/components/demo/component-grid-item";
import { myComponents } from "@/lib/component-config";
import { useTranslations } from "next-intl";

function sectionIdFromLabel(label: string): string {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export function ComponentsPageClient() {
  const t = useTranslations("Sidebar");
  return (
    <div className="min-h-screen pb-20">
      {myComponents.map((group) => (
        <Section
          key={group.label}
          id={sectionIdFromLabel(group.label)}
          title={t(group.label)}
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
