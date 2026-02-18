"use client";

import dynamic from "next/dynamic";
const Webcam = dynamic(
  () => import("@/components/media/webcam").then((m) => m.Webcam),
  { ssr: false },
);

export function WebcamDemo() {
  return (
    <div className="relative w-full h-full min-h-108 overflow-hidden rounded-lg">
      <Webcam containerClassName="absolute inset-0" className="aspect-auto" />
      <p className="absolute bottom-2 left-2 text-xs text-white drop-shadow-md">
        Allow camera access to see preview
      </p>
    </div>
  );
}

export const webcamSource = `<div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
  <Webcam className="absolute inset-0 size-full object-cover" />
</div>`;
