"use client";

import GlassSurface from "@/components/ui-elements/glass-surface";
import { ChevronRight } from "lucide-react";

function GlassSurfaceDemo() {
  return (
    <div className="h-full w-full p-12 flex justify-center items-center text-white bg-[url('https://picsum.photos/800/600')] bg-cover bg-center bg-fixed">
      <GlassSurface
        width={180}
        height={60}
        borderRadius={30}
        contentClassName="group flex items-center justify-center gap-4"
      >
        <ChevronRight className="size-4 group-hover:translate-x-2 transition-transform duration-300" />
        <span className="font-black text-shadow-lg">Hover me</span>
      </GlassSurface>
    </div>
  );
}

const glassSurfaceSource = `import GlassSurface from "@/components/ui-elements/glass-surface";
import { Sun } from "lucide-react";

const GlassSurfaceDemo = () => {
  return (
    <GlassSurface
      width={180}
      height={60}
      borderRadius={30}
      contentClassName="group flex gap-4"
    >
      <ChevronRight className="size-4 group-hover:translate-x-2" />
        Hover me
    </GlassSurface>
)};`;

export { GlassSurfaceDemo, glassSurfaceSource };
