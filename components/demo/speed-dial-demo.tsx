"use client";

import { SpeedDial } from "@/components/navigation/speed-dial";
import { Plus, Share2, Mail, MessageCircle } from "lucide-react";

const VARIANTS = [
  {
    spreadRangeAngle: 360,
    directionAngle: 0,
    title: "360° Full circle",
    description: "Items spread in full circle around the trigger",
  },
  {
    spreadRangeAngle: 180,
    directionAngle: 90,
    title: "180° Down",
    description: "Half circle downward",
  },
  {
    spreadRangeAngle: 180,
    directionAngle: 270,
    title: "180° Up",
    description: "Half circle upward",
  },
  {
    spreadRangeAngle: 90,
    directionAngle: 0,
    title: "90° Right",
    description: "90° fan toward the right",
  },
  {
    spreadRangeAngle: 90,
    directionAngle: 90,
    title: "90° Down",
    description: "90° fan toward the bottom",
  },
  {
    spreadRangeAngle: 90,
    directionAngle: 180,
    title: "90° Left",
    description: "90° fan toward the left",
  },
  {
    spreadRangeAngle: 90,
    directionAngle: 270,
    title: "90° Up",
    description: "90° fan toward the top",
  },
] as const;

function SpeedDialVariantCard({
  spreadRangeAngle,
  directionAngle,
  title,
  description,
}: (typeof VARIANTS)[number]) {
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
          <SpeedDial.Item
            className="bg-primary text-primary-foreground"
            onClick={() => {}}
          >
            <Plus className="size-5" aria-hidden />
          </SpeedDial.Item>
          <SpeedDial.Item
            className="bg-primary text-primary-foreground"
            onClick={() => {}}
          >
            <Share2 className="size-5" aria-hidden />
          </SpeedDial.Item>
          <SpeedDial.Item
            className="bg-primary text-primary-foreground"
            onClick={() => {}}
          >
            <Mail className="size-5" aria-hidden />
          </SpeedDial.Item>
          <SpeedDial.Item
            className="bg-primary text-primary-foreground"
            onClick={() => {}}
          >
            <MessageCircle className="size-5" aria-hidden />
          </SpeedDial.Item>
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
        <SpeedDialVariantCard key={`${v.spreadRangeAngle}-${v.directionAngle}`} {...v} />
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
