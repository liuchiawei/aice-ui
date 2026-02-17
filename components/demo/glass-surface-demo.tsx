"use client";

import GlassSurface from "@/components/ui-elements/glass-surface";

export function GlassSurfaceDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <GlassSurface width={240} height={120} borderRadius={16}>
        <span className="text-sm font-medium text-foreground">Glass card</span>
      </GlassSurface>
    </div>
  );
}

export const glassSurfaceSource = `<GlassSurface width={240} height={120} borderRadius={16}>
  <span className="text-sm font-medium text-foreground">Glass card</span>
</GlassSurface>`;
