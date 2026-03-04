"use client";
import Image from "next/image";
import { HeatmapCanvas } from "@/components/media/heatmap-canvas";

const DEMO_IMAGE = "https://picsum.photos/seed/heatmap-canvas-demo/200/150";

export function HeatmapCanvasDemo() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 *:data-grid-item:min-w-0 *:data-grid-item:min-h-0 *:data-grid-item:w-full *:data-grid-item:h-full *:data-grid-item:space-y-2 **:data-image-container:shadow-lg **:data-image-container:rounded-sm **:data-image-container:overflow-hidden **:data-image-container:w-full **:data-image-container:min-h-0 **:data-image-container:aspect-4/3 **:data-image-container:object-cover">
      <div data-grid-item>
        <Image
          src={DEMO_IMAGE}
          alt="original image"
          width={200}
          height={150}
          className="object-cover rounded-sm shadow-lg select-none touch-none pointer-events-none"
        />
        <h3 className="text-sm font-light text-center">Original</h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="thermal"
            intensitySource="luminance"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Thermal
          <br />
          Intensity: luminance
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="viridis"
            intensitySource="luminance"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Viridis
          <br />
          Intensity: luminance
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="grayscale"
            intensitySource="luminance"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Grayscale
          <br />
          Intensity: luminance
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="jet"
            intensitySource="luminance"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Jet
          <br />
          Intensity: luminance
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="thermal"
            intensitySource="r"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Thermal
          <br />
          Intensity: r
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="thermal"
            intensitySource="g"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Thermal
          <br />
          Intensity: g
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="thermal"
            intensitySource="b"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Thermal
          <br />
          Intensity: b
        </h3>
      </div>
    </div>
  );
}

export const heatmapCanvasSource = `import Image from "next/image";
import { HeatmapCanvas } from "@/components/media/heatmap-canvas";

const DEMO_IMAGE = "https://picsum.photos/seed/heatmap-canvas-demo/400/300";

export function HeatmapCanvasDemo() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 *:data-grid-item:min-w-0 *:data-grid-item:min-h-0 *:data-grid-item:w-full *:data-grid-item:h-full *:data-grid-item:space-y-2 **:data-image-container:shadow-lg **:data-image-container:rounded-sm **:data-image-container:overflow-hidden **:data-image-container:w-full **:data-image-container:min-h-0 **:data-image-container:aspect-4/3 **:data-image-container:object-cover">
      <div data-grid-item>
        <Image
          src={DEMO_IMAGE}
          alt="original image"
          width={200}
          height={150}
          className="object-cover rounded-sm shadow-lg select-none touch-none pointer-events-none"
        />
        <h3 className="text-sm font-light text-center">Original</h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="thermal"
            intensitySource="luminance"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Thermal
          <br />
          Intensity: luminance
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="viridis"
            intensitySource="luminance"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Viridis
          <br />
          Intensity: luminance
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="grayscale"
            intensitySource="luminance"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Grayscale
          <br />
          Intensity: luminance
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="jet"
            intensitySource="luminance"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Jet
          <br />
          Intensity: luminance
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="thermal"
            intensitySource="r"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Thermal
          <br />
          Intensity: r
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="thermal"
            intensitySource="g"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Thermal
          <br />
          Intensity: g
        </h3>
      </div>
      <div data-grid-item>
        <div data-image-container>
          <HeatmapCanvas
            src={DEMO_IMAGE}
            fill
            colormap="thermal"
            intensitySource="b"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-light text-center">
          Colormap: Thermal
          <br />
          Intensity: b
        </h3>
      </div>
    </div>
  );`;
