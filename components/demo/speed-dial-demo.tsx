"use client";

import { SpeedDial } from "@/components/navigation/speed-dial";
import { Plus, Share2, Mail, MessageCircle } from "lucide-react";

const ALL_ITEMS = [
  { icon: Plus, label: "Plus" },
  { icon: Share2, label: "Share2" },
  { icon: Mail, label: "Mail" },
  { icon: MessageCircle, label: "MessageCircle" },
] as const;

const VARIANTS = [
  {
    spreadRangeAngle: 360,
    directionAngle: 0,
    title: "360° Full circle",
    description: "Items spread in full circle (no overlap)",
    itemCount: 4,
  },
  {
    spreadRangeAngle: 180,
    directionAngle: 90,
    title: "180° Down",
    description: "Half circle downward",
    itemCount: 4,
  },
  {
    spreadRangeAngle: 180,
    directionAngle: 270,
    title: "180° Up",
    description: "Half circle upward",
    itemCount: 4,
  },
  {
    spreadRangeAngle: 90,
    directionAngle: 0,
    title: "90° Right",
    description: "90° fan toward the right",
    itemCount: 4,
  },
  {
    spreadRangeAngle: 90,
    directionAngle: 90,
    title: "90° Down",
    description: "90° fan toward the bottom",
    itemCount: 4,
  },
  {
    spreadRangeAngle: 90,
    directionAngle: 180,
    title: "90° Left",
    description: "90° fan toward the left",
    itemCount: 4,
  },
  {
    spreadRangeAngle: 90,
    directionAngle: 270,
    title: "90° Up",
    description: "90° fan toward the top",
    itemCount: 4,
  },
  {
    spreadRangeAngle: 360,
    directionAngle: 90,
    title: "360° 2 items",
    description: "Two items, no overlap",
    itemCount: 2,
  },
  {
    spreadRangeAngle: 90,
    directionAngle: 90,
    title: "90° 1 item",
    description: "Single item centered",
    itemCount: 1,
  },
] as const;

function SpeedDialVariantCard({
  spreadRangeAngle,
  directionAngle,
  title,
  description,
  itemCount = 4,
}: (typeof VARIANTS)[number]) {
  const items = ALL_ITEMS.slice(0, itemCount);
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
      <div className="min-h-[200px] flex items-center justify-center mt-4">
        <SpeedDial.Root
          spreadRangeAngle={spreadRangeAngle}
          directionAngle={directionAngle}
          radius={90}
        >
          {items.map(({ icon: Icon, label }) => (
            <SpeedDial.Item
              key={label}
              className="bg-primary text-primary-foreground"
              onClick={() => {}}
            >
              <Icon className="size-5" aria-hidden />
            </SpeedDial.Item>
          ))}
          <SpeedDial.Trigger aria-label="Open speed dial menu" />
        </SpeedDial.Root>
      </div>
    </div>
  );
}

export function SpeedDialDemo() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {VARIANTS.map((v) => (
        <SpeedDialVariantCard key={v.title} {...v} />
      ))}
    </div>
  );
}

export const speedDialSource = `import { SpeedDial } from "@/components/navigation/speed-dial";
import { Plus, Share2, Mail } from "lucide-react";

<SpeedDial.Root spreadRangeAngle={90} directionAngle={90} radius={120}>
  <SpeedDial.Item onClick={() => {}}>
    <Plus className="size-5" />
  </SpeedDial.Item>
  <SpeedDial.Item onClick={() => {}}>
    <Share2 className="size-5" />
  </SpeedDial.Item>
  <SpeedDial.Item onClick={() => {}}>
    <Mail className="size-5" />
  </SpeedDial.Item>
  <SpeedDial.Trigger aria-label="Open menu" />
</SpeedDial.Root>`;
