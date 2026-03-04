"use client";
import Image from "next/image";
import { HeatmapCanvas } from "@/components/media/heatmap-canvas";

const DEMO_IMAGE = "https://picsum.photos/seed/heatmap-canvas-demo/400/300";

export function HeatmapCanvasDemo() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <HeatmapCanvas
        src={DEMO_IMAGE}
        width={400}
        height={300}
        colormap="thermal"
        intensitySource="luminance"
        objectFit="cover"
        className="shadow-lg rounded-sm overflow-hidden"
      />
      <Image
        src={DEMO_IMAGE}
        alt="original image"
        width={400}
        height={300}
        className="w-full max-w-[400px] h-auto object-cover rounded-sm shadow-lg select-none touch-none pointer-events-none"
      />
    </div>
  );
}

export const heatmapCanvasSource = `import Image from "next/image";
import { HeatmapCanvas } from "@/components/media/heatmap-canvas";

const DEMO_IMAGE = "https://picsum.photos/seed/heatmap-canvas-demo/400/300";

export function HeatmapCanvasDemo() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <HeatmapCanvas
        src={DEMO_IMAGE}
        width={400}
        height={300}
        colormap="thermal"
        intensitySource="luminance"
        objectFit="cover"
        className="shadow-lg rounded-sm overflow-hidden"
      />
      <Image
        src={DEMO_IMAGE}
        alt="original image"
        width={400}
        height={300}
        className="w-full max-w-[400px] h-auto object-cover rounded-sm shadow-lg select-none touch-none pointer-events-none"
      />
    </div>
  );
}`;
