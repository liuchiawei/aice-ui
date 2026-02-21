"use client";

import { SpeedDial } from "@/components/navigation/speed-dial";
import { Plus, Share2, Mail, MessageCircle } from "lucide-react";

export function SpeedDialDemo() {
  return (
    <div className="relative min-h-[220px] w-full">
      <SpeedDial.Root
        spreadRangeAngle={90}
        directionAngle={210}
        radius={120}
        className="absolute bottom-0 right-0"
      >
        <SpeedDial.Item className="bg-primary text-primary-foreground" onClick={() => {}}>
          <Plus className="size-5" aria-hidden />
        </SpeedDial.Item>
        <SpeedDial.Item className="bg-primary text-primary-foreground" onClick={() => {}}>
          <Share2 className="size-5" aria-hidden />
        </SpeedDial.Item>
        <SpeedDial.Item className="bg-primary text-primary-foreground" onClick={() => {}}>
          <Mail className="size-5" aria-hidden />
        </SpeedDial.Item>
        <SpeedDial.Item className="bg-primary text-primary-foreground" onClick={() => {}}>
          <MessageCircle className="size-5" aria-hidden />
        </SpeedDial.Item>
        <SpeedDial.Trigger aria-label="Open speed dial menu" />
      </SpeedDial.Root>
    </div>
  );
}

export const speedDialSource = `import { SpeedDial } from "@/components/navigation/speed-dial";
import { Plus, Share2, Mail } from "lucide-react";

<SpeedDial.Root spreadRangeAngle={90} directionAngle={210} radius={120}>
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
