"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/showcase/section";
import { BackgroundGradientAnimation } from "@/components/background/background-gradient-animation";
import GlassSurface from "@/components/ui/glass-surface";

const Webcam = dynamic(
  () =>
    import("@/components/ui/webcam").then((m) => m.Webcam),
  { ssr: false }
);

function WebcamDemo() {
  return (
    <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border bg-muted">
      <Webcam className="absolute inset-0 size-full object-cover" />
      <p className="absolute bottom-2 left-2 text-xs text-white drop-shadow-md">
        Allow camera access to see preview
      </p>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <div className="min-h-screen pb-20">
      <Section
        id="background-gradient-animation"
        title="Background Gradient Animation"
        description="Animated gradient background with configurable colors and optional pointer-follow interaction."
      >
        <div className="relative h-48 overflow-hidden rounded-lg border border-border">
          <BackgroundGradientAnimation
            className="absolute inset-0"
            size="60%"
            interactive={true}
          />
          <div className="relative flex h-full items-center justify-center">
            <span className="text-sm font-medium text-foreground/90">
              Gradient background
            </span>
          </div>
        </div>
      </Section>

      <Section
        id="glass-surface"
        title="Glass Surface"
        description="Liquid glass surface with SVG displacement and optional backdrop blur."
      >
        <div className="flex flex-wrap gap-4">
          <GlassSurface width={240} height={120} borderRadius={16}>
            <span className="text-sm font-medium text-foreground">
              Glass card
            </span>
          </GlassSurface>
        </div>
      </Section>

      <Section
        id="webcam"
        title="Webcam"
        description="Browser webcam streaming with error handling and ref forwarding."
      >
        <WebcamDemo />
      </Section>
    </div>
  );
}
