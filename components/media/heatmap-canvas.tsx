"use client";
/**
 * HeatmapCanvas: Renders a source image with a heatmap visual effect by mapping
 * pixel intensity (luminance or single channel) to a color gradient. Uses Canvas 2D
 * only; no 3D or extra libraries. Supports objectFit and device pixel ratio.
 */
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ColormapPreset = "thermal" | "viridis" | "jet" | "grayscale";
type IntensitySource = "luminance" | "r" | "g" | "b";

type HeatmapCanvasProps = {
  /** Image URL (must be CORS-enabled for canvas read). */
  src: string;
  /** Display width in CSS pixels. */
  width?: number;
  /** Display height in CSS pixels. */
  height?: number;
  /** Color gradient used to map intensity to color. */
  colormap?: ColormapPreset;
  /** Which value to use as intensity: luminance or single channel. */
  intensitySource?: IntensitySource;
  /** How the image fits within the canvas. */
  objectFit?: "cover" | "contain" | "fill" | "none";
  className?: string;
};

function colormapThermal(t: number): [number, number, number] {
  const x = Math.max(0, Math.min(1, t));
  if (x < 1 / 3) {
    const k = x * 3;
    return [Math.round(k * 255), 0, 0];
  }
  if (x < 2 / 3) {
    const k = (x - 1 / 3) * 3;
    return [255, Math.round(k * 255), 0];
  }
  const k = (x - 2 / 3) * 3;
  return [255, 255, Math.round(k * 255)];
}

function colormapViridis(t: number): [number, number, number] {
  const x = Math.max(0, Math.min(1, t));
  // Simplified viridis-like: dark purple -> blue -> teal -> green -> yellow
  if (x < 0.25) {
    const k = x * 4;
    return [
      Math.round(68 + (59 - 68) * k),
      Math.round(1 + (82 - 1) * k),
      Math.round(84 + (139 - 84) * k),
    ];
  }
  if (x < 0.5) {
    const k = (x - 0.25) * 4;
    return [
      Math.round(59 + (33 - 59) * k),
      Math.round(82 + (145 - 82) * k),
      Math.round(139 + (140 - 139) * k),
    ];
  }
  if (x < 0.75) {
    const k = (x - 0.5) * 4;
    return [
      Math.round(33 + (94 - 33) * k),
      Math.round(145 + (201 - 145) * k),
      Math.round(140 + (98 - 140) * k),
    ];
  }
  const k = (x - 0.75) * 4;
  return [
    Math.round(94 + (253 - 94) * k),
    Math.round(201 + (231 - 201) * k),
    Math.round(98 + (36 - 98) * k),
  ];
}

function colormapJet(t: number): [number, number, number] {
  const x = Math.max(0, Math.min(1, t));
  if (x < 0.125) {
    const k = x * 8;
    return [0, 0, Math.round(128 + (255 - 128) * k)];
  }
  if (x < 0.375) {
    const k = (x - 0.125) * 4;
    return [0, Math.round(k * 255), 255];
  }
  if (x < 0.625) {
    const k = (x - 0.375) * 4;
    return [Math.round(k * 255), 255, Math.round(255 - k * 255)];
  }
  if (x < 0.875) {
    const k = (x - 0.625) * 4;
    return [255, Math.round(255 - k * 255), 0];
  }
  const k = (x - 0.875) * 8;
  return [Math.round(255 - k * 255), 0, 0];
}

function colormapGrayscale(t: number): [number, number, number] {
  const v = Math.round(Math.max(0, Math.min(1, t)) * 255);
  return [v, v, v];
}

const COLORMAP_FNS: Record<
  ColormapPreset,
  (t: number) => [number, number, number]
> = {
  thermal: colormapThermal,
  viridis: colormapViridis,
  jet: colormapJet,
  grayscale: colormapGrayscale,
};

function getIntensity(
  data: Uint8ClampedArray,
  i: number,
  source: IntensitySource,
): number {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (source === "r") return r;
  if (source === "g") return g;
  if (source === "b") return b;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const HeatmapCanvas: React.FC<HeatmapCanvasProps> = ({
  src,
  width = 400,
  height = 300,
  colormap = "thermal",
  intensitySource = "luminance",
  objectFit = "cover",
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsLoading(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (isCancelled) return;
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const displayWidth = width ?? img.naturalWidth;
      const displayHeight = height ?? img.naturalHeight;

      canvas.width = Math.max(1, Math.floor(displayWidth * dpr));
      canvas.height = Math.max(1, Math.floor(displayHeight * dpr));
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsLoading(false);
        return;
      }
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      const offscreen = document.createElement("canvas");
      offscreen.width = Math.max(1, Math.floor(displayWidth));
      offscreen.height = Math.max(1, Math.floor(displayHeight));
      const off = offscreen.getContext("2d");
      if (!off) {
        setIsLoading(false);
        return;
      }

      const iw = img.naturalWidth || displayWidth;
      const ih = img.naturalHeight || displayHeight;
      let dw = displayWidth;
      let dh = displayHeight;
      let dx = 0;
      let dy = 0;
      if (objectFit === "cover") {
        const scale = Math.max(displayWidth / iw, displayHeight / ih);
        dw = Math.ceil(iw * scale);
        dh = Math.ceil(ih * scale);
        dx = Math.floor((displayWidth - dw) / 2);
        dy = Math.floor((displayHeight - dh) / 2);
      } else if (objectFit === "contain") {
        const scale = Math.min(displayWidth / iw, displayHeight / ih);
        dw = Math.ceil(iw * scale);
        dh = Math.ceil(ih * scale);
        dx = Math.floor((displayWidth - dw) / 2);
        dy = Math.floor((displayHeight - dh) / 2);
      } else if (objectFit === "fill") {
        dw = displayWidth;
        dh = displayHeight;
      } else {
        dw = iw;
        dh = ih;
        dx = Math.floor((displayWidth - dw) / 2);
        dy = Math.floor((displayHeight - dh) / 2);
      }
      off.fillStyle = "#000";
      off.fillRect(0, 0, offscreen.width, offscreen.height);
      off.drawImage(img, dx, dy, dw, dh);

      let imageData: ImageData;
      try {
        imageData = off.getImageData(0, 0, offscreen.width, offscreen.height);
      } catch {
        ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
        setIsLoading(false);
        return;
      }

      const data = imageData.data;
      const outData = new Uint8ClampedArray(data.length);
      const mapFn = COLORMAP_FNS[colormap];

      for (let i = 0; i < data.length; i += 4) {
        const intensity = getIntensity(data, i, intensitySource);
        const t = intensity / 255;
        const [r, g, b] = mapFn(t);
        outData[i] = r;
        outData[i + 1] = g;
        outData[i + 2] = b;
        outData[i + 3] = data[i + 3];
      }

      const result = new ImageData(outData, offscreen.width, offscreen.height);
      ctx.putImageData(result, 0, 0);
      setIsLoading(false);
    };

    img.onerror = () => {
      if (!isCancelled) setIsLoading(false);
    };

    return () => {
      isCancelled = true;
    };
  }, [src, width, height, colormap, intensitySource, objectFit]);

  return (
    <div className={cn("relative inline-block", className)}>
      <canvas
        ref={canvasRef}
        className="block max-w-full h-auto"
        style={{ width: width ?? "auto", height: height ?? "auto" }}
        aria-label="Heatmap visualization of source image"
      />
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted/50"
          aria-hidden
        >
          <span className="text-muted-foreground text-sm">Loading…</span>
        </div>
      )}
    </div>
  );
};
