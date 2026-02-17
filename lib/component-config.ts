import type { ComponentType } from "react";
import {
  GlassSurfaceDemo,
  glassSurfaceSource,
} from "@/components/demo/glass-surface-demo";
import {
  CodeBlockDemo,
  codeBlockSource,
} from "@/components/demo/code-block-demo";
import {
  FloatingCirclesDemo,
  floatingCirclesSource,
} from "@/components/demo/floating-circle-demo";
import { WebcamDemo, webcamSource } from "@/components/demo/webcam-demo";

export interface ComponentItem {
  slug: string;
  label: string;
  demo?: ComponentType;
  sourceCode?: string;
}

export const myComponents: { label: string; items: ComponentItem[] }[] = [
  {
    label: "UI",
    items: [
      {
        slug: "glass-surface",
        label: "Glass Surface",
        demo: GlassSurfaceDemo,
        sourceCode: glassSurfaceSource,
      },
      {
        slug: "code-block",
        label: "Code Block",
        demo: CodeBlockDemo,
        sourceCode: codeBlockSource,
      },
      { slug: "radar-chart", label: "Radar Chart" },
    ],
  },
  {
    label: "Blocks",
    items: [
      { slug: "motion-wheel", label: "Motion Wheel" },
      { slug: "3d-flip-card", label: "3D Flip Card" },
    ],
  },
  {
    label: "Text",
    items: [
      { slug: "glyph-katakana", label: "Glyph Katakana" },
      { slug: "slide-up-letters", label: "Slide Up Letters" },
    ],
  },
  {
    label: "Background",
    items: [
      {
        slug: "floating-circles",
        label: "Floating Circles",
        demo: FloatingCirclesDemo,
        sourceCode: floatingCirclesSource,
      },
    ],
  },
  {
    label: "Media",
    items: [
      {
        slug: "webcam",
        label: "Webcam",
        demo: WebcamDemo,
        sourceCode: webcamSource,
      },
    ],
  },
];

export interface DemoConfig {
  Demo: ComponentType;
  sourceCode: string;
  language: "tsx" | "ts";
}

export function getDemoBySlug(slug: string): DemoConfig | undefined {
  for (const group of myComponents) {
    const item = group.items.find((i) => i.slug === slug);
    if (item?.demo != null && item?.sourceCode != null)
      return { Demo: item.demo, sourceCode: item.sourceCode, language: "tsx" };
  }
  return undefined;
}

export const demoSlugs = myComponents.flatMap((group) =>
  group.items
    .filter((item) => item.demo != null && item.sourceCode != null)
    .map((item) => item.slug),
);
