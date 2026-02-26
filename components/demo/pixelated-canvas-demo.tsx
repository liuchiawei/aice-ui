"use client";
import { PixelatedCanvas } from "@/components/media/pixelated-canvas";

export function PixelatedCanvasDemo() {
  return (
    <div className="flex items-center justify-center">
      <PixelatedCanvas
        src="https://picsum.photos/seed/pixelated-canvas-demo/400/300"
        width={400}
        height={300}
        cellSize={3}
        dotScale={0.9}
        shape="square"
        backgroundColor="#000000"
        dropoutStrength={0.4}
        interactive
        distortionStrength={3}
        distortionRadius={80}
        distortionMode="swirl"
        followSpeed={0.2}
        jitterStrength={4}
        jitterSpeed={4}
        sampleAverage
        tintColor="#FFFFFF"
        tintStrength={0.2}
        className="shadow-lg"
      />
    </div>
  );
}

export const pixelatedCanvasSource = `import { PixelatedCanvas } from "@/components/media/pixelated-canvas";

return (
  <PixelatedCanvas
    src="https://picsum.photos/seed/pixelated-canvas-demo/400/300"
    width={400}
    height={300}
    cellSize={3}
    dotScale={0.9}
    shape="square"
    backgroundColor="#000000"
    dropoutStrength={0.4}
    interactive
    distortionStrength={3}
    distortionRadius={80}
    distortionMode="swirl"
    followSpeed={0.2}
    jitterStrength={4}
    jitterSpeed={4}
    sampleAverage
    tintColor="#FFFFFF"
    tintStrength={0.2}
  />
);`;
