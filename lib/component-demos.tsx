"use client";

import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import { CodeBlock } from "@/components/ai-elements/code-block";
import { FloatingCircles } from "@/components/background/floating-circles";
import GlassSurface from "@/components/ui/glass-surface";

const Webcam = dynamic(
  () => import("@/components/media/webcam").then((m) => m.Webcam),
  { ssr: false },
);

function GlassSurfaceDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <GlassSurface width={240} height={120} borderRadius={16}>
        <span className="text-sm font-medium text-foreground">Glass card</span>
      </GlassSurface>
    </div>
  );
}

const glassSurfaceSource = `<GlassSurface width={240} height={120} borderRadius={16}>
  <span className="text-sm font-medium text-foreground">Glass card</span>
</GlassSurface>`;

function CodeBlockDemo() {
  return <CodeBlock code={glassSurfaceSource} language="tsx" showLineNumbers />;
}

const codeBlockSource = `<CodeBlock code={code} language="tsx" showLineNumbers />`;

function FloatingCirclesDemo() {
  return (
    <div className="relative h-48 w-full max-w-md overflow-hidden rounded-lg border border-border">
      <FloatingCircles
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
  );
}

const floatingCirclesSource = `<div className="relative h-48 overflow-hidden rounded-lg border">
  <FloatingCircles
    className="absolute inset-0"
    size="60%"
    interactive={true}
  />
  <div className="relative flex h-full items-center justify-center">
    <span className="text-sm text-foreground/90">Gradient background</span>
  </div>
</div>`;

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

const webcamSource = `<div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
  <Webcam className="absolute inset-0 size-full object-cover" />
</div>`;

export interface DemoConfig {
  Demo: ComponentType;
  sourceCode: string;
  language: "tsx" | "ts";
}

const demos: Record<string, DemoConfig> = {
  "glass-surface": {
    Demo: GlassSurfaceDemo,
    sourceCode: glassSurfaceSource,
    language: "tsx",
  },
  "code-block": {
    Demo: CodeBlockDemo,
    sourceCode: codeBlockSource,
    language: "tsx",
  },
  "floating-circles": {
    Demo: FloatingCirclesDemo,
    sourceCode: floatingCirclesSource,
    language: "tsx",
  },
  webcam: {
    Demo: WebcamDemo,
    sourceCode: webcamSource,
    language: "tsx",
  },
};

export function getDemoBySlug(slug: string): DemoConfig | undefined {
  return demos[slug];
}

export const demoSlugs = Object.keys(demos);
